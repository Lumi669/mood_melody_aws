import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const message = "Welcome to the backend of the mood-melody app";
    res.status(200).json(message);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

export default router;
