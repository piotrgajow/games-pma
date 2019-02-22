package com.webappcraft.dota.storage.repository;

import com.webappcraft.dota.domain.HeroRepository;
import com.webappcraft.dota.storage.entity.HeroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("heroRepository")
public interface HibernateHeroRepository extends HeroRepository, JpaRepository<HeroEntity, Long> {
}
