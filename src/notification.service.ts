import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async sendEmailNotification(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    console.log(`Sending email to ${to} with subject: ${subject}`);
    await this.mockSendOperation('email');
  }

  async sendWhatsAppNotification(to: string, message: string): Promise<void> {
    console.log(`Sending WhatsApp message to ${to}: ${message}`);
    await this.mockSendOperation('WhatsApp');
  }

  private async mockSendOperation(type: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${type} notification sent successfully!`);
        resolve();
      }, 500);
    });
  }
}
