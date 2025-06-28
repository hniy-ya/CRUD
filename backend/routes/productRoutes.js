import express from "express";
import {
    createProducts,
    getAllProducts,
    deleteProducts,
    updateProducts,
    getProduct,
    findProducts,
} from "../controllers/productControler.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);
router.get("/find/:name", findProducts);

export default router;
