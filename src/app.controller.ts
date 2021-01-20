import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { GameCreate, HeroRanking } from './types';
import { Composition, Game, Hero } from '@prisma/client';
import { CompositionService } from './composition.service';
import { GameService } from './game.service';

@Controller("/api")
export class AppController {

    private readonly heroService: HeroService;
    private readonly compositionService: CompositionService;
    private readonly gameService: GameService;

    constructor(heroRankingService: HeroService, compositionService: CompositionService, gameService: GameService) {
        this.heroService = heroRankingService;
        this.compositionService = compositionService;
        this.gameService = gameService;
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
    public async postGame(@Body() game: GameCreate): Promise<Game> {
        return this.gameService.saveGame(game);
    }

    @Get("/test")
    public async test(): Promise<any> {
        await this.gameService.saveGame({ heroId: 1, compositionId: 1, mmr: 0 });
        return { message: "OK" };
    }

}
