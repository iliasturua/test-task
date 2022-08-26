export interface FileNameParam {
  fileName: string;
}

export interface ImageBuffers {
  thumbImage: Buffer;
  mediumImage: Buffer;
  bigImage: Buffer;
}

export interface ImageNames {
  thumb: string;
  medium: string;
  big: string;
}

export const thumbImageSize = 300;
export const mediumImageSize = 1024;
export const bigImageSize = 2048;

// 5mb
export const imageValidSize = 5 * 1000 * 1000;
