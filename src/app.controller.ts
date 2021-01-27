import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { GameCreate, HeroRanking, MmrStatus } from './types';
import { Composition, Game, Hero } from '@prisma/client';
import { CompositionService } from './composition.service';
import { GameService } from './game.service';
import { StatisticsService } from './statistics.service';

@Controller("/api")
export class AppController {

    private readonly heroService: HeroService;
    private readonly compositionService: CompositionService;
    private readonly gameService: GameService;
    private readonly statisticsService: StatisticsService;

    constructor(heroRankingService: HeroService, compositionService: CompositionService, gameService: GameService, statisticsService: StatisticsService) {
        this.heroService = heroRankingService;
        this.compositionService = compositionService;
        this.gameService = gameService;
        this.statisticsService = statisticsService;
    }

    @Get("/hero/ranking")
    public async getHeroRanking(): Promise<HeroRanking[]> {
        return this.heroService.getHeroRanking();
    }

    @Get("/hero")
    public async getHeroList(): Promise<Hero[]> {
        return this.heroService.getHeroList();
    }

    @Get("/composition")
    public async getCompositionList(): Promise<Composition[]> {
        return this.compositionService.getCompositionList();
    }

    @Post("/game")
    public async postGame(@Body() gameCreate: GameCreate): Promise<Game> {
        const game = await this.gameService.saveGame(gameCreate);
        await this.statisticsService.updateMmr(game.mmr);
        return game;
    }

    @Get("/statistics")
    public async getStatistics(): Promise<MmrStatus> {
        return this.statisticsService.getStatistics();
    }

    @Get("/test")
    public async test(): Promise<any> {
        await this.gameService.saveGame({ heroId: 1, compositionId: 1, mmr: 0 });
        return { message: "OK" };
    }

}
