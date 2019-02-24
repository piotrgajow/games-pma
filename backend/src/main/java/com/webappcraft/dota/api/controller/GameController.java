package com.webappcraft.dota.api.controller;

import com.webappcraft.dota.api.dto.CreateGameDTO;
import com.webappcraft.dota.api.dto.HeroSuggestionsDTO;
import com.webappcraft.dota.domain.game.GameRepository;
import com.webappcraft.dota.domain.game.GameResult;
import com.webappcraft.dota.domain.game.GameService;
import com.webappcraft.dota.domain.game.StartNewGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(@Qualifier("hibernateGameRepository") GameRepository hibernateGameRepository) {
        this.gameService = new GameService(hibernateGameRepository);
    }

    @PostMapping("player/{playerId}/game")
    public Long createGame(@PathVariable("playerId") Long playerId, @RequestBody CreateGameDTO createGameDTO) {
        StartNewGame command = new StartNewGame(playerId, createGameDTO.getType());
        return gameService.handleStartNewGame(command);
    }

    @PutMapping("/game/{gameId}/position/{position}")
    public void selectHeroRole(@PathVariable("gameId") Long gameId, @PathVariable("position") Integer position) {
        return;
    }

    @GetMapping("/game/{gameId}/hero-suggestions")
    public HeroSuggestionsDTO getHeroSuggestions(@PathVariable("gameId") Long gameId) {
        return null;
    }

    @PutMapping("game/{gameId}/hero/{heroId}")
    public void selectHero(@PathVariable("gameId") Long gameId, @PathVariable("heroId") Long heroId) {
        return;
    }

    @PutMapping("/game/{gameId}/result/{result}")
    public void updateGameResult(@PathVariable("gameId") Long gameId, @PathVariable("result") GameResult result) {
        return;
    }

    @PutMapping("/game/{gameId}/hero-rating/{heroRating}")
    public void updateHeroRating(@PathVariable("gameId") Long gameId, @PathVariable("heroRating") Integer rating) {
        return;
    }

}
