package com.webappcraft.dota.api.service;

import com.webappcraft.dota.api.dto.CreateGameDTO;
import com.webappcraft.dota.domain.HeroRole;
import com.webappcraft.dota.domain.game.GameResult;
import com.webappcraft.dota.storage.entity.GameEntity;
import com.webappcraft.dota.storage.entity.HeroEntity;
import com.webappcraft.dota.storage.entity.PlayerEntity;
import com.webappcraft.dota.storage.repository.entity.GameEntityRepository;
import com.webappcraft.dota.storage.repository.entity.HeroEntityRepository;
import com.webappcraft.dota.storage.repository.entity.PlayerEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
public class GameApplicationService {

    private final GameEntityRepository gameEntityRepository;
    private final PlayerEntityRepository playerEntityRepository;
    private final HeroEntityRepository heroEntityRepository;

    @Autowired
    public GameApplicationService(
            @Qualifier("gameEntityRepository") GameEntityRepository gameEntityRepository,
            @Qualifier("playerEntityRepository") PlayerEntityRepository playerEntityRepository,
            @Qualifier("heroEntityRepository") HeroEntityRepository heroEntityRepository
    ) {
        this.gameEntityRepository = gameEntityRepository;
        this.playerEntityRepository = playerEntityRepository;
        this.heroEntityRepository = heroEntityRepository;
    }

    public Long startNewGame(Long playerId, CreateGameDTO createGameDTO) {
        PlayerEntity playerEntity = playerEntityRepository.getOne(playerId);
        GameEntity gameEntity = GameEntity.builder()
                .player(playerEntity)
                .type(createGameDTO.getType())
                .playedOn(LocalDateTime.now()) // TODO remove when @DynamicInsert is fixed in JPA
                .build();
        System.out.println(gameEntity);
        return gameEntityRepository.save(gameEntity).getId();
    }

    public void selectHeroRole(Long gameId, HeroRole heroRole) {
        GameEntity gameEntity = gameEntityRepository.getOne(gameId);
        gameEntity.setHeroRole(heroRole);
        gameEntityRepository.save(gameEntity);
    }

    public void selectHero(Long gameId, Long heroId) {
        GameEntity gameEntity = gameEntityRepository.getOne(gameId);
        HeroEntity heroEntity = heroEntityRepository.getOne(heroId);
        gameEntity.setHero(heroEntity);
        gameEntityRepository.save(gameEntity);
    }

    public void updateResult(Long gameId, GameResult result) {
        GameEntity gameEntity = gameEntityRepository.getOne(gameId);
        gameEntity.setResult(result);
        gameEntityRepository.save(gameEntity);
    }

    public void updateRating(Long gameId, Integer rating) {
        GameEntity gameEntity = gameEntityRepository.getOne(gameId);
        gameEntity.setPlayerRating(rating);
        gameEntityRepository.save(gameEntity);
    }

}
