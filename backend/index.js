import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use("/api/product", productRoutes);

export default app;
