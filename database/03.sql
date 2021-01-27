CREATE TABLE statistics
(
    id    INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(25)  NOT NULL,
    value VARCHAR(100) NOT NULL,
    UNIQUE KEY (name)
);

INSERT INTO statistics
VALUES (1, 'current-mmr', 0);
INSERT INTO statistics
VALUES (2, 'peak-mmr', 0);
INSERT INTO statistics
VALUES (3, 'hidden-mmr', 0);

CREATE OR REPLACE VIEW daily_statistics AS
SELECT COALESCE(SUM(mmr), 0) as mmr_delta,
       COUNT(mmr)            as games_played
FROM games
WHERE DATE(timestamp) = DATE(NOW());

DELIMITER ;;;
CREATE PROCEDURE update_mmr(IN mmr INT)
BEGIN

    SELECT CONVERT(value, UNSIGNED INTEGER) INTO @current FROM statistics WHERE name = 'current-mmr';

    SELECT CONVERT(value, UNSIGNED INTEGER) INTO @peak FROM statistics WHERE name = 'peak-mmr';

    SELECT @current + mmr INTO @new;

    UPDATE statistics
    SET value = CONVERT(@new, CHAR)
    WHERE name = 'current-mmr';

    IF (@new > @peak)
    THEN
        UPDATE statistics
        SET value = CONVERT(@new, CHAR)
        WHERE name = 'peak-mmr';
    END IF;

END;;;
DELIMITER ;
