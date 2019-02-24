package com.webappcraft.dota.storage.repository;

import com.webappcraft.dota.domain.game.Game;
import com.webappcraft.dota.domain.game.GameRepository;
import com.webappcraft.dota.storage.entity.GameEntity;
import com.webappcraft.dota.storage.entity.PlayerEntity;
import com.webappcraft.dota.storage.repository.entity.GameEntityRepository;
import com.webappcraft.dota.storage.repository.entity.PlayerEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository("hibernateGameRepository")
public class HibernateGameRepository implements GameRepository {

    private final GameEntityRepository gameEntityRepository;
    private final PlayerEntityRepository playerEntityRepository;

    @Autowired
    public HibernateGameRepository(
            @Qualifier("gameEntityRepository") GameEntityRepository gameEntityRepository,
            @Qualifier("playerEntityRepository") PlayerEntityRepository playerEntityRepository
    ) {
        this.gameEntityRepository = gameEntityRepository;
        this.playerEntityRepository = playerEntityRepository;
    }

    @Override
    public Long create(Game game) {
        PlayerEntity playerEntity = playerEntityRepository.getOne(game.getPlayerId());
        GameEntity gameEntity = GameEntity.builder()
                .player(playerEntity)
                .type(game.getGameType())
                .playedOn(game.getGameStartedOn())
                .build();
        return gameEntityRepository.save(gameEntity).getId();
    }

}
