import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('send-notification-whatsapp')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-notification-email')
  email(): string {
    return this.appService.getHello();
  }
}
