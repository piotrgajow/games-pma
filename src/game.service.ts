import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Game, GameCreateArgs } from '@prisma/client';
import { GameCreate } from './types';

@Injectable()
export class GameService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async saveGame(game: GameCreate): Promise<Game> {
        const insert: GameCreateArgs = {
            data: {
                composition: { connect: { id: game.compositionId } },
                hero: { connect: { id: game.heroId } },
                mmr: game.mmr,
            },
        };
        return this.prismaService.game.create(insert);
    }

}
