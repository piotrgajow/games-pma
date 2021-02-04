import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MmrStatus } from './types';

@Injectable()
export class StatisticsService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async getStatistics(userId: number): Promise<MmrStatus> {
        const [[dailyStats], user] = await Promise.all([
            this.prismaService.$queryRaw<{ mmrDelta: number, gamesPlayed: number}[]>`
SELECT COALESCE(SUM(mmr), 0) as mmrDelta,
       COUNT(mmr)            as gamesPlayed
FROM games
WHERE DATE(timestamp) = DATE(NOW()) AND user_id = ${userId}
`,
            this.prismaService.user.findUnique({ where: { id: userId } }),
        ]);
        return {
            currentMmr: user.currentMmr,
            peakMmr: user.peakMmr,
            mmrDeltaToday: dailyStats.mmrDelta,
            gamesPlayedToday: dailyStats.gamesPlayed,
        }
    }

    public async updateMmr(userId: number, mmrDelta: number): Promise<void> {
        await this.prismaService.$executeRaw`CALL update_mmr(${userId}, ${mmrDelta})`;
    }

}
