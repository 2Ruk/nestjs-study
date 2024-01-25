import { BoardLikeModule } from '@api/board/board-like.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbConfig } from '@api/library/config/db.config';
import { BoardModule } from './board/board.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ReplyLikeModule } from '@api/reply/reply-like.module';
import { ReplyModule } from '@api/reply/reply.module';

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
    ReplyModule,
    ReplyLikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
