import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from './prisma.service';
import { UserCreateArgs } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {

    private readonly prismaService: PrismaService;
    private readonly jwtService: JwtService

    constructor(prisma: PrismaService, jwtService: JwtService) {
        this.prismaService = prisma;
        this.jwtService = jwtService;
    }

    public async register(login: string, password: string): Promise<void> {
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const insert: UserCreateArgs = {
            data: { login, passwordHash },
        };
        await this.prismaService.user.create(insert);
    }

    public async validateUser(login: string, password: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({ where: { login } });
        if (!user) {
            return null;
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return null;
        }
        const { passwordHash, ...result } = user;
        return result;
    }

    public async login(user: any): Promise<any> {
        const payload = { username: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}


