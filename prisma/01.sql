CREATE TABLE heroes
(
    id   INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    UNIQUE KEY (name)
);

CREATE TABLE compositions
(
    id   INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    UNIQUE KEY (name)
);

CREATE TABLE games
(
    id             INT       NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hero_id        INT       NOT NULL,
    composition_id INT       NOT NULL,
    mmr            INT       NOT NULL,
    timestamp      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (hero_id) REFERENCES heroes (id),
    FOREIGN KEY (composition_id) REFERENCES compositions (id)
);

CREATE OR REPLACE VIEW hero_statistics AS
SELECT h.id,
       h.name,
       COALESCE(AVG(g.mmr), 0) as mmr,
       COALESCE(STD(g.mmr), 0) as mmr_std,
       COUNT(g.id)             as games_played
FROM heroes h
         LEFT JOIN games g ON g.hero_id = h.id
GROUP BY h.id;

CREATE OR REPLACE VIEW composition_statistics AS
SELECT c.name, AVG(g.mmr) as score, COUNT(g.id) as games_played
FROM games g
         JOIN compositions c ON c.id = g.composition_id
GROUP BY c.id
ORDER BY score DESC;

CREATE TABLE statistics
(
    id    INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(25)  NOT NULL,
    value VARCHAR(100) NOT NULL,
    UNIQUE KEY (name)
);

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

CREATE TABLE users
(
    id            INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login         VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    UNIQUE KEY (login)
);
