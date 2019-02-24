package com.webappcraft.dota.storage.repository.entity;

import com.webappcraft.dota.storage.entity.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("gameEntityRepository")
public interface GameEntityRepository extends JpaRepository<GameEntity, Long> {
}
