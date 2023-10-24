import app from "./app.js";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to The database");
  });

app.listen(4000, () => {
  console.log("App is running");
});
