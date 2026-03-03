import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Server healthy!" });
});

app.get("/api/ping", (req, res) => {
  res.json({ status: "success", pong: true });
});

// matches all routes that have not yet been matched -- catch-all
// should come after all other routes, but before error handling
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: "error", message: "Not Found Error: Unknown endpoint" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Something has gone wrong on the backend server",
  });
});

export default app;
