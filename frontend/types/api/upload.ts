export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface PostUploadImageResponse {
  data: {
    url: string;
    file: MulterFile;
  };
}
