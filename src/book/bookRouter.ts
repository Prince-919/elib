import path from "node:path";
import express from "express";
import {
  createBook,
  listBooks,
  updateBook,
  getSingleBook,
  deleteBook,
} from "./bookController";
import multer from "multer";
import authenticate from "../middlewares/authenticate";

const router = express.Router();
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 3e7 => 35mb
});

router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);
router.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

router.get("/", listBooks);
router.get("/:bookId", getSingleBook);
router.delete("/:bookId", authenticate, deleteBook);

export default router;
