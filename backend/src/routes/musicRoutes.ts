import { Router, Request, Response, NextFunction } from "express";
import {
  insertManyMusics,
  getAllMusics,
  deleteAllMusics,
} from "../models/music";
import { Music } from "../types/type";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    insertManyMusics(req.body as Music[]);
    res.status(201).json({ message: "Music inserted successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const musics = getAllMusics();
    res.status(200).json(musics);
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    deleteAllMusics();
    res.status(200).json({ message: "All music records deleted." });
  } catch (error) {
    next(error);
  }
});

export default router;
