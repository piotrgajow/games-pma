import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Hero, HeroStatistic } from '@prisma/client';
import { HeroRanking, HeroScore } from './types';

@Injectable()
export class HeroService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async getHeroList(): Promise<Hero[]> {
        return this.prismaService.hero.findMany()
    }

    public async getHeroRanking(): Promise<HeroRanking[]> {
        const statistics = await this.prismaService.heroStatistic.findMany()
        return statistics
            .map(scoreHero)
            .sort(sort)
            .map(rankHero);
    }

}

function scoreHero(heroStatistic: HeroStatistic): HeroScore {
    const { mmr, mmrStd, gamesPlayed } = heroStatistic;
    const hasSmallSampleSize = gamesPlayed < 3;
    const mainScore = mmr > 0 ? Math.ceil(mmr / 10) : Math.floor(mmr / 10);
    const subScore = hasSmallSampleSize ? 100 : mmrStd;
    const score = hasSmallSampleSize ? mainScore / 2 : mainScore;
    return {
        id: heroStatistic.id,
        name: heroStatistic.name,
        score,
        subScore,
    };
}

function rankHero(heroScore: HeroScore, index: number): HeroRanking {
    return {
        id: heroScore.id,
        name: heroScore.name,
        rank: index + 1,
        score: heroScore.score,
    }
}

function sort(a: HeroScore, b: HeroScore): number {
    if (a.score === b.score) {
        return a.subScore - b.subScore;
    } else {
        return b.score - a.score;
    }
}
