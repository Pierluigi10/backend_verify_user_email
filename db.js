import "./config.js";
import mongoose from "mongoose";

const mongoConnectionString = process.env.DB;

mongoose
  .connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection estabished!"))
  .catch((err) => console.log("[ERROR] Connection failed", err));
