import { BadRequestException, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import {
  bigImageSize,
  ImageBuffers,
  imageValidSize,
  mediumImageSize,
  thumbImageSize,
} from 'types';

@Injectable()
export class ImageService {
  private isValidSize(binaryImageText: string): boolean {
    return binaryImageText.length <= imageValidSize;
  }

  private isValidExtension(binaryImageText: string): boolean {
    return binaryImageText.substring(1, 4) === 'PNG';
  }

  private async resizeImage(
    originalImageBase64Buffer: Buffer,
    size: number,
  ): Promise<Buffer> {
    return await sharp(originalImageBase64Buffer).resize(size).toBuffer();
  }

  public async resizeImages(binaryImage: any): Promise<ImageBuffers> {
    const binaryImageBuffer = Buffer.from(binaryImage, 'binary');
    const binaryImageText = binaryImageBuffer.toString('utf-8');

    if (!this.isValidSize(binaryImageText)) {
      throw new BadRequestException(`Image size is too big`);
    }

    if (!this.isValidExtension(binaryImageText)) {
      throw new BadRequestException(`Invalid image extension`);
    }

    const base64data = binaryImageBuffer.toString('base64');
    const originalImageBase64Buffer = Buffer.from(base64data, 'base64');
    const thumbImage = await this.resizeImage(
      originalImageBase64Buffer,
      thumbImageSize,
    );
    const mediumImage = await this.resizeImage(
      originalImageBase64Buffer,
      mediumImageSize,
    );
    const bigImage = await this.resizeImage(
      originalImageBase64Buffer,
      bigImageSize,
    );
    const imageBuffers: ImageBuffers = {
      thumbImage,
      mediumImage,
      bigImage,
    };
    return imageBuffers;
  }
}
