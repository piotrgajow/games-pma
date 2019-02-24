package com.webappcraft.dota.api.controller;

import com.webappcraft.dota.api.dto.HeroDTO;
import com.webappcraft.dota.storage.entity.HeroEntity;
import com.webappcraft.dota.storage.repository.entity.HeroEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeroController {

    private final HeroEntityRepository heroRepository;

    @Autowired
    public HeroController(HeroEntityRepository heroRepository) {
        this.heroRepository = heroRepository;
    }

    @PostMapping("/hero")
    public void createHero(@RequestBody HeroDTO heroDto) {
        HeroEntity hero = heroDto.toEntity();
        heroRepository.save(hero);
    }

    @PutMapping("/hero/{heroId}")
    public void updateHero(@PathVariable("heroId") Long heroId, @RequestBody HeroDTO heroDto) {
        HeroEntity hero = heroDto.toEntity();
        hero.setId(heroId);
        heroRepository.save(hero);
    }

}
