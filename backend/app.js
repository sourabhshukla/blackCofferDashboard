import express from "express";
import cors from "cors";
import { router as barRoute } from "./routes/bar.route.js";
import { router as lineRoute } from "./routes/line.route.js";
import { router as pieRoute } from "./routes/pie.route.js";
import mockData from "./models/info.model.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/bar", barRoute);
app.use("/api/v1/line", lineRoute);
app.use("/api/v1/pie", pieRoute);

export default app;
