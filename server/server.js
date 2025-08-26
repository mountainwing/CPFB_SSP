import express from "express";
import cors from "cors";
import "dotenv/config";
import uploadRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

// allow only the react app's origin in production
app.use(cors({ origin: ["http://localhost:8080"] }));

// Mount under a common prefix
app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
