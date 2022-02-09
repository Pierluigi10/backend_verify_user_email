import "./db.js";
import express from "express";

// (async () => await connection())();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
