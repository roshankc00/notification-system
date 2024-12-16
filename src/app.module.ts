import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { NotificationService } from './notification.service';
import { APP_GUARD } from '@nestjs/core';
import { MessageConsumer } from './notification.consumer';
import { NOTIFICATION_QUEUE } from './constant';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 300000,
        limit: 10000,
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: NOTIFICATION_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotificationService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    MessageConsumer,
  ],
})
export class AppModule {}
