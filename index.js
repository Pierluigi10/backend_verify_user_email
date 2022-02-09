import dotenv from "dotenv";
import express from "express";

const app = express();

app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
