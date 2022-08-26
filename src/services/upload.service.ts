import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  bigImageSize,
  ImageBuffers,
  ImageNames,
  mediumImageSize,
  thumbImageSize,
} from 'types';

@Injectable()
export class UploadService {
  async uploadImages(
    fileName: string,
    imageBuffers: ImageBuffers,
  ): Promise<ImageNames> {
    const thumbImageName = await this.uploadImage(
      fileName + '-' + thumbImageSize,
      imageBuffers.thumbImage,
    );
    const mediumImageName = await this.uploadImage(
      fileName + '-' + mediumImageSize,
      imageBuffers.mediumImage,
    );
    const bigImageName = await this.uploadImage(
      fileName + '-' + bigImageSize,
      imageBuffers.bigImage,
    );
    const imageNames: ImageNames = {
      thumb: thumbImageName,
      medium: mediumImageName,
      big: bigImageName,
    };

    return imageNames;
  }

  private async uploadImage(name: string, buffer: Buffer): Promise<string> {
    const key = `${name}.png`;

    const s3 = new S3();

    await new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: process.env.S3_PUBLIC_BUCKET,
          Key: key,
          Body: buffer,
          ContentEncoding: 'base64',
          ContentType: 'image/png',
        },
        (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(key);
          }
        },
      );
    });

    return key;
  }
}
