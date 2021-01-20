import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeroService } from './hero.service';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CompositionService } from './composition.service';
import { GameService } from './game.service';

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
    ],
    controllers: [AppController],
    providers: [PrismaService, HeroService, CompositionService, GameService],
})
export class AppModule {
}
