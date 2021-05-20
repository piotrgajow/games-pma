import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Game, GameCreateArgs } from '@prisma/client';
import { GameCreate } from './types';
import { PLACEMENT_RATING, RATING_MARGIN } from './consts';

@Injectable()
export class GameService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async saveGame(game: GameCreate, userId: number): Promise<Game> {
        const rating = determineRating(game.placement, game.isExAequo, game.mmr);
        const insert: GameCreateArgs = {
            data: {
                user: { connect: { id: userId } },
                composition: { connect: { id: game.compositionId } },
                hero: { connect: { id: game.heroId } },
                mmr: game.mmr,
                placement: game.placement,
                isExAequo: game.isExAequo,
                rating,
            },
        };
        return this.prismaService.game.create(insert);
    }

}

function determineRating(placement: number, isExAequo: boolean, mmr: number): number {
    const [min, max] = PLACEMENT_RATING[placement][isExAequo ? 1 : 0];
    if (min - RATING_MARGIN <= mmr && mmr <= max + RATING_MARGIN) {
        return mmr;
    }
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
