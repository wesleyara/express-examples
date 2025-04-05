import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import pkg from "../package.json";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);

app.get("/", (req, res) => {
  const expressVersion = pkg.dependencies.express.replace("^", "") || "unknown";
  const nodeVersion = process.versions.node || "unknown";

  res.json({
    name: "Express Server",
    versions: {
      app: pkg.version,
      express: expressVersion,
      node: nodeVersion,
    },
    description: "This is a simple Express server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
