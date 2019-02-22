package com.webappcraft.dota.api.controller;

import com.webappcraft.dota.storage.entity.HeroEntity;
import com.webappcraft.dota.storage.repository.HibernateHeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeroController {

    private final HibernateHeroRepository heroRepository;

    @Autowired
    public HeroController(HibernateHeroRepository heroRepository) {
        this.heroRepository = heroRepository;
    }

    @PostMapping("/hero")
    public void createHero(@RequestBody HeroEntity hero) {
        System.out.println(hero.getName());
        heroRepository.save(hero);
    }

}
