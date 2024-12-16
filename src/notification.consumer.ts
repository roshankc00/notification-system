import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { NOTIFICATION_QUEUE } from './constant';

@Processor(NOTIFICATION_QUEUE)
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);
  constructor() {}

  @Process(NOTIFICATION_QUEUE)
  async handleSendEmail(job: Job<any>) {
    try {
      const { data } = job;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
