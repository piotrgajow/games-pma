package com.webappcraft.dota.storage.repository.entity;

import com.webappcraft.dota.storage.entity.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("playerEntityRepository")
public interface PlayerEntityRepository extends JpaRepository<PlayerEntity, Long> {
}
