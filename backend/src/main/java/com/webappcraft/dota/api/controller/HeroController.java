package com.webappcraft.dota.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeroController {

    @GetMapping("/")
    public String index() {
        return "Hello Spring!";
    }

}
