import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeroService } from './hero.service';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CompositionService } from './composition.service';
import { GameService } from './game.service';
import { StatisticsService } from './statistics.service';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'ui'),
            exclude: ['/api*'],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'node_modules', 'vue', 'dist'),
            serveRoot: '/lib',
        }),
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '15m' },
        }),
    ],
    controllers: [AppController],
    providers: [
        PrismaService,
        HeroService,
        CompositionService,
        GameService,
        StatisticsService,
        UsersService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AppModule {
}
