import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const uploadImage = (buffer: Buffer, folder = "uploads"): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "");
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const deleteImage = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};
