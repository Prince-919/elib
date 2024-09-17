import path from "node:path";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as { [filename: string]: Express.Multer.File[] };
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  const bookFileName = files.file[0].filename;
  const bookfilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "books-cover",
      format: coverImageMimeType,
    });

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookfilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading the files"));
  }

  res.json({});
};
