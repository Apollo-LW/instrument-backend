import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter,NestFastifyApplication} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Instrument API')
    .setDescription('One of the main APIs for instrument, this incldues the main CRUD operations as well as joins between differnt entities')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
