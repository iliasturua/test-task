import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UploadService } from './services/upload.service';
import { ConfigModule } from '@nestjs/config';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';
import { ImageService } from './services/image.service';

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
