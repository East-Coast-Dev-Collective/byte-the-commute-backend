import { Router } from "express";

const router = Router();

router.get("/:id/recent-routes", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Recent routes placeholder endpoint",
    data: {
      userId: req.params.id,
      recentRoutes: [],
    },
  });
});

export default router;
