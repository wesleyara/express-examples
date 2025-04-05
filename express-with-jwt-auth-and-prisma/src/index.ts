import cors from "cors";
import dotenv from "dotenv";
import { colorLog } from "essentials-utils";
import express from "express";

import router from "./router";
import { routes } from "./router/routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  }),
);
app.use(router);

app.listen(PORT, () => {
  const routeNames = Object.keys(routes).map(key => routes[key as keyof typeof routes]);

  console.log(
    colorLog(`Server is running on http://localhost:${PORT}`, {
      color: "green",
    }),
  );
  console.log("");

  routeNames.forEach(route => {
    console.log(
      colorLog(`Instance route: ${route}`, {
        color: "green",
      }),
    );
  });
});
