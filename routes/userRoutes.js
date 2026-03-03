import { Router } from "express";
import mockUsers from "../data/mockUsers.js";

const router = Router();

router.get("/:id/recent-routes", (req, res) => {
  const { id } = req.params;
  const user = mockUsers.find((u) => u.userId === id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      userId: user.userId,
      name: user.name,
      defaultFrom: user.defaultFrom,
      defaultTo: user.defaultTo,
      savedLocations: user.savedLocations,
      recentRoutes: user.recentRoutes,
    },
  });
});

export default router;
