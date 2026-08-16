import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation using class-validator decorators
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS — FRONTEND_URL can be a comma-separated list of allowed origins
  const rawOrigins = process.env.FRONTEND_URL ?? 'http://localhost:5173';
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const candidates = [
    resolve(process.cwd(), 'frontend', 'dist'),
    resolve(process.cwd(), '..', 'frontend', 'dist'),
  ];
  const frontendDist = candidates.find((dir) => existsSync(dir)) ?? candidates[0];

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use(express.static(frontendDist));
  expressApp.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      next();
      return;
    }

    if (req.originalUrl.includes('.')) {
      next();
      return;
    }

    res.sendFile(resolve(frontendDist, 'index.html'));
  });

  // All routes are prefixed with /api
  app.setGlobalPrefix('api');

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api`);
}

void bootstrap();
