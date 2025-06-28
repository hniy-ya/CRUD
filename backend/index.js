import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/product", productRoutes);

app.listen(PORT, () => {
    console.log("server run at port", +PORT);
    connectDB();
});
