import { Router } from "express";
import Music from "../models/music";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newMusics = await Music.bulkCreate(req.body, { validate: true });
    res.status(201).json(newMusics);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

router.get("/", async (req, res, next) => {
  try {
    const musics = await Music.findAll();
    res.status(200).json(musics);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

router.delete("/", async (req, res, next) => {
  try {
    await Music.destroy({ where: {} });
    res.status(200).json({ message: "All data deleted successfully!" });
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

export default router;
