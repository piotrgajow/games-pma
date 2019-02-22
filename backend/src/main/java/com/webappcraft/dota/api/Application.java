package com.webappcraft.dota.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.webappcraft.dota.api"})
@EnableJpaRepositories(basePackages = {"com.webappcraft.dota.storage.repository"})
@EntityScan(basePackages = {"com.webappcraft.dota.storage.entity"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
