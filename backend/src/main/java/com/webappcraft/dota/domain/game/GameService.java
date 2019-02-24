package com.webappcraft.dota.domain.game;

public class GameService {

    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Long handleStartNewGame(StartNewGame command) {
        Game game = new Game(command.getPlayerId(), command.getGameType());
        return gameRepository.create(game);
    }

}
