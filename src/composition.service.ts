import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Composition } from '@prisma/client';

@Injectable()
export class CompositionService {

    private readonly prismaService: PrismaService;

    constructor(prisma: PrismaService) {
        this.prismaService = prisma;
    }

    public async getCompositionList(): Promise<Composition[]> {
        return this.prismaService.composition.findMany()
    }

}
