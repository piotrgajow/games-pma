import { Game } from '@prisma/client';

export interface HeroScore {
    id: number;
    name: string;
    score: number;
    subScore: number;
}

export interface HeroRanking {
    id: number;
    name: string;
    rank: number;
    score: number;
}

export type GameCreate = Omit<Game, "id" | "timestamp">

export interface MmrStatus {
    currentMmr: number;
    peakMmr: number;
    mmrDeltaToday: number;
    gamesPlayedToday: number;
}
