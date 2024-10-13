import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
