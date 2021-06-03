import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Hero } from '@prisma/client';
import { HeroRanking, HeroScore, HeroStatistic } from './types';
import { SMALL_SAMPLE_SIZE, Z_TABLE } from './consts';

@Injectable()
export class HeroService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async getHeroList(): Promise<Hero[]> {
        return this.prismaService.hero.findMany()
    }

    public async getHeroRanking(userId: number): Promise<HeroRanking[]> {
        const statistics = await this.prismaService.$queryRaw<HeroStatistic[]>`
SELECT
r.id,
r.name,
r.gamesPlayed,
r.avg,
r.stdev,
COALESCE(a.rating_avg, 0)   AS avgOld,
COALESCE(a.rating_stdev, 0) AS stdevOld,
COALESCE(a.games_played, 0) AS gamesPlayedOld
FROM
    (SELECT
         h.id,
         h.name,
         COALESCE(AVG(g.rating), 0) AS avg,
         COALESCE(STD(g.rating), 0) AS stdev,
         COUNT(g.id)                AS gamesPlayed
         FROM
             heroes h
                 LEFT JOIN games g ON g.hero_id = h.id AND g.user_id = ${userId}
         GROUP BY h.id) r
        LEFT JOIN hero_stat_archive a ON a.hero_id = r.id AND a.user_id = ${userId}`;
        return statistics
            .map(scoreHero)
            .sort(sort)
            .map(rankHero);
    }

}

function scoreHero(heroStatistic: HeroStatistic): HeroScore {
    const score = calculateHeroScore(heroStatistic);

    return {
        id: heroStatistic.id,
        name: heroStatistic.name,
        score,
    };
}

function calculateHeroScore(heroStatistic: HeroStatistic): number {
    const hasSmallSampleSize = heroStatistic.gamesPlayed < SMALL_SAMPLE_SIZE;
    if (hasSmallSampleSize && heroStatistic.gamesPlayedOld < SMALL_SAMPLE_SIZE) {
        return 50.0;
    }

    const avg = hasSmallSampleSize ? heroStatistic.avgOld : heroStatistic.avg;
    const stdev = hasSmallSampleSize ? heroStatistic.stdevOld : heroStatistic.stdev;
    if (stdev === 0) {
        return avg > 0 ? 100.0 : 0.0;
    } else {
        const zScore = Math.round(100 * avg / stdev) / 100;
        if (zScore <= -4) {
            return 0.0;
        }
        if (zScore >= 4) {
            return 100 + Math.round(10 * avg) / 10;
        }
        return Math.round(1000 * Z_TABLE[zScore]) / 10;
    }
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
    return b.score - a.score;
}
