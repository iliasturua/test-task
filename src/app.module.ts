import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';
import { RawBodyMiddleware } from './raw-body.middleware';
import { ImageService } from './image.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [UploadService, ImageService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RawBodyMiddleware).forRoutes('*');
  }
}
