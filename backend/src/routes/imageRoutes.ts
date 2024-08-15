import { Router } from "express";
import Image from "../models/image";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const newImages = await Image.bulkCreate(req.body, { validate: true });
    res.status(201).json(newImages);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

router.delete("/", async (req, res, next) => {
  try {
    await Image.destroy({ where: {} });
    res.status(200).json({ message: "All data deleted successfully!" });
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

export default router;
