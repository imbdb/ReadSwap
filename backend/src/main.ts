import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8080', // backend
      'http://localhost:3000', // frontend
    ],
  });
  app.use(
    session({
      secret: [
        'thedayofsunandnightofmoon-codeallnightsleepatnoon',
        'workpileduplikeadune-assignmentlargeanddeadlinesoon',
      ],
      resave: false,
      saveUninitialized: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ReadSwap API')
    .setDescription('The ReadSwap API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
