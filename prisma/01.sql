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

CREATE TABLE users
(
    id            INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login         VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    current_mmr   INT          NOT NULL DEFAULT 0,
    peak_mmr      INT          NOT NULL DEFAULT 0,
    hidden_mmr    INT          NOT NULL DEFAULT 0,
    UNIQUE KEY (login)
);

CREATE TABLE games
(
    id             INT       NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id        INT       NOT NULL,
    hero_id        INT       NOT NULL,
    composition_id INT       NOT NULL,
    mmr            INT       NOT NULL,
    timestamp      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (hero_id) REFERENCES heroes (id),
    FOREIGN KEY (composition_id) REFERENCES compositions (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

DELIMITER ;;;
CREATE PROCEDURE update_mmr(IN userId INT, IN mmr INT)
BEGIN
    START TRANSACTION;

    SELECT current_mmr, peak_mmr
    FROM users
    WHERE id = userId
    INTO @current, @peak;

    SELECT @current + mmr INTO @new;

    UPDATE users
    SET current_mmr = @new
    WHERE id = userId;

    IF (@new > @peak)
    THEN
        UPDATE users
        SET peak_mmr = @new
        WHERE id = userId;
    END IF;
    COMMIT;
END;;;
DELIMITER ;
