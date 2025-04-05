import express from "express";

import pkg from "../../package.json";
import { routes } from "./routes";

const router = express.Router();

router.get(routes.home, (req, res) => {
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

export default router;
