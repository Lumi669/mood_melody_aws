import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const message = "Test is working ...test222333";
    res.status(200).json(message);
  } catch (error) {
    next(error); // Pass the error to the errorHandler middleware
  }
});

export default router;
