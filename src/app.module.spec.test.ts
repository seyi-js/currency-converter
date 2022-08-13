import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { CurrencyModule } from './modules/currency/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),

    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: (
          await MongoMemoryReplSet.create({ replSet: { count: 2 } })
        ).getUri(),
      }),
    }),

    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppSpecModule {}
