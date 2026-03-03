import { Router } from "express";

const router = Router();

router.post("/login", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Login placeholder endpoint",
  });
});

router.post("/logout", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Logout placeholder endpoint",
  });
});

export default router;
