import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email')
export class EmailConsumer extends WorkerHost {
  constructor(
    private readonly emailProvider: MailerService
  ) {
    super();
  }

  public async process(job: Job, token?: string): Promise<any> {
    const { data, name } = job;

    console.info(`Iniciando Consumer ${name}`);

    try {
      await this.emailProvider.sendMail(data);
      console.info(`Email enviado com sucesso`);
    }catch(error){
      console.error(error);
      console.error(`Erro ao enviar email`);
    }
  }
}