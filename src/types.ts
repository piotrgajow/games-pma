import { Game } from '@prisma/client';

export interface HeroScore {
    id: number;
    name: string;
    score: number;
}

export interface HeroStatistic {
    id: number;
    name: string;
    gamesPlayed: number;
    avg: number;
    stdev: number;
    gamesPlayedOld: number;
    avgOld: number;
    stdevOld: number;
}

export interface HeroRanking {
    id: number;
    name: string;
    rank: number;
    score: number;
}

export type GameCreate = Omit<Game, "id" | "timestamp" | "rating">

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

export type Placement = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
