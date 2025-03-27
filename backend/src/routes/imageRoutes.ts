import { Router, Request, Response, NextFunction } from "express";
import {
  insertManyImages,
  getAllImages,
  deleteAllImages,
} from "../models/image";
import { Image } from "../types/type";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    insertManyImages(req.body as Image[]);
    res.status(201).json({ message: "Images inserted successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = getAllImages();
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    deleteAllImages();
    res.status(200).json({ message: "All image records deleted." });
  } catch (error) {
    next(error);
  }
});

export default router;
