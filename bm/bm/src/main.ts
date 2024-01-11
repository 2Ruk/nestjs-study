import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@api/library/filter/http-exception.filter';
import { LoggingInterceptor } from '@api/library/interceptor/logger.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from '@api/library/interceptor/time-ouut.interceptor';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from "@api/library/interceptor/response.interceptor";

async function bootstrap() {
  // NOTE: 나중에는 ENV로 관리할 수 있도록 한다.
  const HTTP_DOMAIN = 'http://localhost:3000';
  const PORT = 3000;

  const app = await NestFactory.create(AppModule);

  // Note: 모든 요청에 대해 /api로 시작하는 경로로 요청이 들어오면 라우터를 타도록 한다.
  app.setGlobalPrefix('/api');

  // Note: 모든 요청에 대해 유효성 검사를 한다.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Note: DTO에 정의되지 않은 속성이 들어오면 제거한다.
      forbidNonWhitelisted: true, // Note: DTO에 정의되지 않은 속성이 들어오면 요청을 막는다.
      transform: true, // Note: 요청의 타입을 DTO에 정의된 타입으로 변환한다.
    }),
  );

  // Note: Http Exception 발생 시 처리를 위해 Exception Filter를 사용한다.
  app.useGlobalFilters(new HttpExceptionFilter());
  // Note: 모든 요청에 대해 로그를 남긴다.
  app.useGlobalInterceptors(new LoggingInterceptor(new Logger('NestJS')));
  // Note: 일정 시간이 지나도록 응답이 없으면 요청을 취소하고 에러를 발생시킨다.
  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Note: cookie를 사용하기 위해 설정한다.
  app.use(cookieParser());

  app.enableCors({
    origin: [HTTP_DOMAIN],
    credentials: true,
  });

  await app.listen(PORT);
}
bootstrap();
