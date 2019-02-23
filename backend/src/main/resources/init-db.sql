CREATE TABLE hero (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE hero_role (
    id BIGINT NOT NULL AUTO_INCREMENT,
    hero_id BIGINT NOT NULL,
    role INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY FK__hero_role__hero_id (hero_id) REFERENCES hero (id)
);

CREATE TABLE player (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE game (
    id BIGINT NOT NULL AUTO_INCREMENT,
    player_id BIGINT NOT NULL,
    played_on DATETIME NOT NULL DEFAULT NOW(),
    type VARCHAR(255),
    result TINYINT,
    hero_id BIGINT,
    hero_role INT,
    player_rating INT,
    gosuai_rating INT,

    PRIMARY KEY (id),
    FOREIGN KEY FK__game__player_id (player_id) REFERENCES player (id),
    FOREIGN KEY FK__game__hero_id (hero_id) REFERENCES hero (id)
);

CREATE TABLE hero_player_data (
    id BIGINT NOT NULL AUTO_INCREMENT,
    player_id BIGINT NOT NULL,
    hero_id BIGINT NOT NULL,
    to_try TINYINT DEFAULT 0,
    games_played INT,
    games_won INT,
    average_player_rating DOUBLE,
    average_gosuai_rating DOUBLE,

    PRIMARY KEY (id),
    FOREIGN KEY FK__hero_player_data__player_id (player_id) REFERENCES player (id),
    FOREIGN KEY FK__hero_player_data__hero_id (hero_id) REFERENCES hero (id)
);

