import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue
  ) { }

  public async addEmailJob(data: any) {
    await this.emailQueue.add('sendEmail', data);
  }
}