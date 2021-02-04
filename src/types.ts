import { Game } from '@prisma/client';

export interface HeroScore {
    id: number;
    name: string;
    score: number;
    subScore: number;
}

export interface HeroStatistic {
    id: number;
    name: string;
    mmr: number;
    mmrStd: number;
    gamesPlayed: number;
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

export interface User {
    id: number;
    login: string;
    passwordHash: string;
}
