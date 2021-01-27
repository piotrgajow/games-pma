import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Game, DailyStatistics, Statistic } from '@prisma/client';
import { MmrStatus } from './types';

const CURRENT_MMR_QUERY = { where: { name: "current-mmr" } };
const PEAK_MMR_QUERY = { where: { name: "peak-mmr" } };

@Injectable()
export class StatisticsService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async getStatistics(): Promise<MmrStatus> {
        const [dailyStats, currentMmr, peakMmr] = await Promise.all([
            this.prismaService.dailyStatistics.findFirst(),
            this.getCurrentMmr(),
            this.getPeakMmr(),
        ]);
        return {
            currentMmr,
            peakMmr,
            mmrDeltaToday: dailyStats.mmrDelta,
            gamesPlayedToday: dailyStats.gamesPlayed,
        }
    }

    public async getCurrentMmr(): Promise<number> {
        return Number((await this.prismaService.statistic.findUnique(CURRENT_MMR_QUERY)).value);
    }

    public async getPeakMmr(): Promise<number> {
        return Number((await this.prismaService.statistic.findUnique(PEAK_MMR_QUERY)).value);
    }

    public async updateMmr(mmrDelta: number): Promise<void> {
        await this.prismaService.$executeRaw`CALL update_mmr(${mmrDelta})`;
    }

}
