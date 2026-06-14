import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "..");

const app = express();

app.use(express.json());
app.use(express.static(publicPath));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorMiddleware);

app.use((req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;
