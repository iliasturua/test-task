import { Controller, Post, Request, Req, Param } from '@nestjs/common';
import { UploadService } from '../services/upload.service';
import { ImageService } from '../services/image.service';
import { FileNameParam, ImageNames } from 'types';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('/:fileName')
  async uploadFile(
    @Param() param: FileNameParam,
    @Req() req: Request,
  ): Promise<ImageNames> {
    const imageBuffers = await this.imageService.resizeImages(req.body as any);

    const imageNames = await this.uploadService.uploadImages(
      param.fileName,
      imageBuffers,
    );

    return imageNames;
  }
}
