import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: process.env.FRONT_END_HOST });

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
