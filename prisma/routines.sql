DELIMITER ;;;

-- ---------------------------------------------------------------------------------------------------------------------

DROP FUNCTION IF EXISTS recalculate_mean;;;
CREATE FUNCTION recalculate_mean(iOldMean DOUBLE, iOldSampleCount INT, iNewSample INT) RETURNS DOUBLE DETERMINISTIC
BEGIN
    RETURN (iOldMean * iOldSampleCount + iNewSample) / (iOldSampleCount + 1);
END;;;

-- ---------------------------------------------------------------------------------------------------------------------

DROP FUNCTION IF EXISTS recalculate_standard_deviation;;;
CREATE FUNCTION recalculate_standard_deviation(iOldMean DOUBLE, iOldStdev DOUBLE, iOldSampleCount INT, iNewSample INT,
                                               iNewMean DOUBLE) RETURNS DOUBLE DETERMINISTIC
BEGIN
    DECLARE vOldCorrection INT DEFAULT iOldSampleCount - 1;
    DECLARE vOldVariance DOUBLE DEFAULT iOldStdev * iOldStdev;
    DECLARE vNewVariance DOUBLE;

    SET vNewVariance =
                (vOldCorrection * vOldVariance + (iNewSample - iNewMean) * (iNewSample - iOldMean)) / iOldSampleCount;

    RETURN SQRT(vNewVariance);
END;;;

-- ---------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS update_archive;;;
CREATE PROCEDURE update_archive(IN iHeroId INT, IN iUserId INT, IN iPlacement DOUBLE, IN iRating INT)
BEGIN
    DECLARE vArchiveId INT;
    DECLARE vGameCount INT;
    DECLARE vRatingAvg DOUBLE;
    DECLARE vRatingAvgPrev DOUBLE;
    DECLARE vRatingStdev DOUBLE;
    DECLARE vPlacementAvg DOUBLE;
    DECLARE vNotFound INT DEFAULT FALSE;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET vNotFound = TRUE;

    SELECT
        id,
        games_played,
        rating_avg,
        rating_stdev,
        placement_avg
        INTO vArchiveId, vGameCount, vRatingAvg, vRatingStdev, vPlacementAvg
        FROM
            hero_stat_archive
        WHERE
              user_id = iUserId
          AND hero_id = iHeroId;

    IF vNotFound THEN
        SELECT 1, iRating, 0, iPlacement INTO vGameCount, vRatingAvg, vRatingStdev, vPlacementAvg;

        INSERT INTO
            hero_stat_archive (user_id, hero_id, games_played, rating_avg, rating_stdev, placement_avg)
            VALUES (iUserId, iHeroId, vGameCount, vRatingAvg, vRatingStdev, vPlacementAvg);
    ELSE
        SET vPlacementAvg = recalculate_mean(vPlacementAvg, vGameCount, iPlacement);
        SET vRatingAvgPrev = vRatingAvg;
        SET vRatingAvg = recalculate_mean(vRatingAvgPrev, vGameCount, iRating);
        SET vRatingStdev =
                recalculate_standard_deviation(vRatingAvgPrev, vRatingStdev, vGameCount, iRating, vRatingAvg);
        SET vGameCount = vGameCount + 1;

        UPDATE hero_stat_archive
        SET
            games_played  = vGameCount,
            rating_avg    = vRatingAvg,
            rating_stdev  = vRatingStdev,
            placement_avg = vPlacementAvg
            WHERE
                  user_id = iUserId
              AND hero_id = iHeroId;
    END IF;
END;;;

-- ---------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS archive_games;;;
CREATE PROCEDURE archive_games()
BEGIN
    DECLARE vUserId INT;
    DECLARE vHeroId INT;
    DECLARE vRating INT;
    DECLARE vPlacement DOUBLE;
    DECLARE vIsExAequo TINYINT;
    DECLARE vNotFound INT DEFAULT FALSE;
    DECLARE cGames CURSOR FOR SELECT user_id, hero_id, placement, is_ex_aequo, rating FROM games;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET vNotFound = TRUE;

    OPEN cGames;

    gamesLoop:
    LOOP

        FETCH cGames INTO vUserId, vHeroId, vPlacement, vIsExAequo, vRating;

        SELECT vUserId, vHeroId, vPlacement, vIsExAequo, vRating;

        IF vNotFound THEN LEAVE gamesLoop; END IF;

        SET vPlacement = vPlacement - IF(vIsExAequo, 0.5, 0);

        SELECT vUserId, vHeroId, vPlacement, vIsExAequo, vRating;

        CALL update_archive(vHeroId, vUserId, vPlacement, vRating);

    END LOOP gamesLoop;

    TRUNCATE games;
END;;;


-- ---------------------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS reset_mmr;;;
CREATE PROCEDURE reset_mmr()
BEGIN
    START TRANSACTION;

    CALL archive_games();

    UPDATE users SET hidden_mmr = current_mmr, current_mmr = 0; COMMIT;
END;;;

-- ---------------------------------------------------------------------------------------------------------------------

DELIMITER ;
