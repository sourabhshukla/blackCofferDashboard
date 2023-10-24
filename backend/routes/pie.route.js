import express from "express";
import { getData } from "../controllers/pie.controller.js";
const router = express.Router();

router.get("/data", getData);

export { router };
