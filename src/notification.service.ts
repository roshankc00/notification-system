import { Injectable } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Injectable()
export class NotificationService {
  @Throttle({ short: { ttl: 300000, limit: 2 } })
  async sendEmailNotification(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    // Implement the email sending logic here, e.g., using nodemailer or a third-party service like SendGrid
    console.log(`Sending email to ${to} with subject: ${subject}`);
    // Simulate sending email
    await this.mockSendOperation('email');
  }

  // Method to send WhatsApp notification
  @Throttle({ short: { ttl: 300000, limit: 2 } })
  async sendWhatsAppNotification(to: string, message: string): Promise<void> {
    // Implement WhatsApp sending logic here, e.g., using Twilio API
    console.log(`Sending WhatsApp message to ${to}: ${message}`);
    // Simulate sending WhatsApp message
    await this.mockSendOperation('WhatsApp');
  }

  // Simulated send operation to mimic external service handling
  private async mockSendOperation(type: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${type} notification sent successfully!`);
        resolve();
      }, 1000); // Simulate 1-second delay
    });
  }
}
