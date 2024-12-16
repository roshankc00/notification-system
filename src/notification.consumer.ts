import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { NOTIFICATION_QUEUE } from './constant';
import axios from 'axios';

@Processor(NOTIFICATION_QUEUE)
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);
  constructor() {}

  @Process(NOTIFICATION_QUEUE)
  async handlesendNotification(job: Job<any>) {
    this.logger.log(
      `Processing email notification: ${JSON.stringify(job.data)}`,
    );
    try {
      await axios.get('http://localhost:3000/send-notification-email');
      this.logger.log('Email notification sent successfully');
    } catch (error) {
      this.logger.error('Failed to send email notification', error.stack);
      throw error; // Re-throw to trigger retry
    }
  }

  private async sendEmail() {}
}
