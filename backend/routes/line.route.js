import express from "express";
import { getData } from "../controllers/line.controller.js";
const router = express.Router();

router.post("/data", getData);

export { router };
