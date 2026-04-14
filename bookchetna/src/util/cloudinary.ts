import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { AppError } from "./AppError";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export class cloudinaryServies {
  private static cloudinaryInstance: cloudinaryServies;
  static getCloudinaryInstace() {
    if (this.cloudinaryInstance) {
      return this.cloudinaryInstance;
    } else {
      this.cloudinaryInstance = new cloudinaryServies();
      return this.cloudinaryInstance;
    }
  }
  private constructor() { }
  async uploadImage(file: File) {
    try {
      const byte = await file.arrayBuffer();
        const buffer = Buffer.from(byte);
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "nextjs_uploads",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result as UploadApiResponse);
            },
          )
          .end(buffer);
      });

      console.log(result);
      console.log(result)
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Cloudinary upload error:", error);
      throw new AppError(`Failed to upload image: ${message}`, 500);
    }
  }
}
