import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { existsSync } from 'node:fs';
import { createServer as createHttpServer } from 'node:http';
import { resolve } from 'node:path';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import type { ViteDevServer } from 'vite';
import { AppModule } from './app.module';

function isApiRequest(url: string | undefined): boolean {
  const path = url?.split('?')[0] ?? '/';
  return path === '/api' || path.startsWith('/api/');
}

async function bootstrap() {
  const expressApp = express();
  const httpServer = createHttpServer(expressApp);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const rawOrigins =
    process.env.FRONTEND_URL ?? 'http://localhost:3000,http://localhost:5173';
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

  app.setGlobalPrefix('api');

  const frontendRoot = resolve(process.cwd(), 'frontend');
  const frontendDist = resolve(frontendRoot, 'dist');
  const indexHtml = resolve(frontendDist, 'index.html');
  const useVite = process.env.NODE_ENV !== 'production';

  // Non-API traffic must be handled before Nest's router (otherwise GET / → JSON 404).
  if (useVite) {
    process.env.VITE_MIDDLEWARE_MODE = 'true';
    const { createServer } = await import('vite');
    const vite: ViteDevServer = await createServer({
      root: frontendRoot,
      configFile: resolve(frontendRoot, 'vite.config.ts'),
      server: {
        middlewareMode: true,
        hmr: { server: httpServer },
      },
      appType: 'spa',
    });

    expressApp.use((req: Request, res: Response, next: NextFunction) => {
      if (isApiRequest(req.url)) {
        next();
        return;
      }
      vite.middlewares(req, res, next);
    });
    console.log('Dev mode: Vite middleware on the same port as the API');
  } else if (existsSync(indexHtml)) {
    const staticHandler = express.static(frontendDist);
    expressApp.use((req: Request, res: Response, next: NextFunction) => {
      if (isApiRequest(req.url)) {
        next();
        return;
      }
      staticHandler(req, res, (err) => {
        if (err) {
          next(err);
          return;
        }
        if (req.url?.includes('.')) {
          next();
          return;
        }
        res.sendFile(indexHtml);
      });
    });
  } else {
    console.warn(
      'No frontend build at app/frontend/dist — API only until you run npm run build.',
    );
  }

  await app.init();

  const port = Number(process.env.PORT ?? 3000);
  await new Promise<void>((resolveListen) => {
    httpServer.listen(port, () => resolveListen());
  });
  console.log(`App running on http://localhost:${port}`);
  console.log(`API available at http://localhost:${port}/api`);
}

void bootstrap();
