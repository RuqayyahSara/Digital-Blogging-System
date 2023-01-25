import express from "express";
import config from "config";
import cookieParser from 'cookie-parser';
import apiRouter from "./controllers/index.js";
import "./dbConnect.js";
import path from "path";
import { fileURLToPath } from "url"

const port = config.get("PORT");

const app = express();

const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename);

app.use(express.json()); //body-Parser
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "build")));
app.use("/", apiRouter)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
