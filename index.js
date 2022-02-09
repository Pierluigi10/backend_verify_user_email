import "./db.js";
import express from "express";
import { router } from "./routes/usersRouter.js"

// (async () => await connection())();

const app = express();

app.use(express.json());
app.use("/api/user", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
