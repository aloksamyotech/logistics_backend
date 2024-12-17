import express from "express";
import { DBConnection } from "./src/core/connection/connection.js";
import dotenv from "dotenv/config";
import router from "./src/routes/routes.js";
import cors from "cors";

const db = new DBConnection();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);


db.databaseConnection();

const Port = process.env.PORT;

app.listen(Port, () => {
  console.log("Server is running on port:", Port);
});
