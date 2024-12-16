import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import axios from 'axios';
import { NOTIFICATION_QUEUE } from './constant';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller()
export class AppController {
  constructor(
    private readonly notificationService: NotificationService,
    @InjectQueue(NOTIFICATION_QUEUE) private notificationQueue: Queue,
  ) {}

  // for eg this is the whatsapp notification server and you have this rate limiter
  @Get('send-notification-whatsapp')
  @Throttle({ short: { ttl: 10000, limit: 2 } })
  getHello() {
    return this.notificationService.sendWhatsAppNotification(
      'whatsapp',
      'whatsapp',
    );
  }

  // for eg this is the email server and you have this rate limiter
  @Get('send-notification-email')
  @Throttle({ short: { ttl: 10000, limit: 2 } })
  email() {
    return this.notificationService.sendEmailNotification(
      'email',
      'email',
      'email',
    );
  }

  @Get()
  @SkipThrottle()
  async sendNotification() {
    try {
      await this.notificationQueue.add(
        NOTIFICATION_QUEUE,
        {},
        {
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
      return { message: 'Email notification queued successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
