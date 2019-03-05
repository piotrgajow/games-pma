package com.webappcraft.dota.storage.repository.entity;

import com.webappcraft.dota.storage.entity.HeroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("heroEntityRepository")
public interface HeroEntityRepository extends JpaRepository<HeroEntity, Long> {
}
