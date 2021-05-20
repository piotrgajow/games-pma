ALTER TABLE games
    ADD COLUMN placement   INT AFTER mmr,
    ADD COLUMN is_ex_aequo TINYINT(1) AFTER placement,
    ADD COLUMN rating      INT AFTER is_ex_aequo;

UPDATE games
SET
    placement   = CASE
                      WHEN mmr >= 85 THEN 1
                      WHEN mmr >= 50 THEN 2
                      WHEN mmr >= 20 THEN 3
                      WHEN mmr >= -5 THEN 4
                      WHEN mmr >= -35 THEN 5
                      WHEN mmr >= -65 THEN 6
                      WHEN mmr >= -90 THEN 7
                      ELSE 8
        END,
    is_ex_aequo = CASE
                      WHEN mmr >= 85 THEN 0
                      WHEN mmr >= 65 THEN 0
                      WHEN mmr >= 50 THEN 1
                      WHEN mmr >= 35 THEN 0
                      WHEN mmr >= 20 THEN 1
                      WHEN mmr >= 10 THEN 0
                      WHEN mmr >= -5 THEN 1
                      WHEN mmr >= -20 THEN 0
                      WHEN mmr >= -35 THEN 1
                      WHEN mmr >= -50 THEN 0
                      WHEN mmr >= -65 THEN 1
                      WHEN mmr >= -80 THEN 0
                      WHEN mmr >= -90 THEN 1
                      ELSE 0
        END,
    rating      = mmr;

ALTER TABLE games
    MODIFY COLUMN placement INT NOT NULL,
    MODIFY COLUMN is_ex_aequo TINYINT(1) NOT NULL,
    MODIFY COLUMN rating INT NOT NULL;

CREATE TABLE hero_stat_archive
(
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id       INT NOT NULL,
    hero_id       INT NOT NULL,
    games_played  INT NOT NULL,
    rating_avg    DOUBLE NOT NULL,
    rating_stdev  DOUBLE NOT NULL,
    placement_avg DOUBLE NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (hero_id) REFERENCES heroes (id)
);
