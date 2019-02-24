package com.webappcraft.dota.domain.game;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Game {

    private Long playerId;
    private GameType gameType;
    private LocalDateTime gameStartedOn;

    Game(Long playerId, GameType gameType) {
        this.playerId = playerId;
        this.gameType = gameType;
        this.gameStartedOn = LocalDateTime.now();
    }

}
