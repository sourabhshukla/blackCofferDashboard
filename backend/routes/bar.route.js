import express from "express";
import {
  getAllUniqueCategoryValues,
  getFilteredData,
} from "../controllers/bar.controller.js";
const router = express.Router();

router.get("/unique", getAllUniqueCategoryValues);
router.post("/data", getFilteredData);

export { router };
