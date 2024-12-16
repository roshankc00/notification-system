import { Logger } from '@nestjs/common';
import { NOTIFICATION_QUEUE } from './constants/constat';
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

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
