import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './notification.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly notificationService: NotificationService) {}

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
  sendNotification(@Query('q') q: string) {
    if (q === 'email') {
    } else {
    }
  }
}
