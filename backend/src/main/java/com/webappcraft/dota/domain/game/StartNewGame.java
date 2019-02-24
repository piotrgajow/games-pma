package com.webappcraft.dota.domain.game;

import com.webappcraft.dota.domain.Command;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class StartNewGame implements Command {

    private Long playerId;
    private GameType gameType;

}
