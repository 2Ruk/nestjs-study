import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from '@api/library/config/db.config';
import { BoardLikeModule } from '@api/board-like/board-like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DbConfig,
    }),
    UserModule,
    BoardModule,
    BoardLikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
