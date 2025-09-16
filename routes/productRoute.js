import express from "express";
import { getAllProducts, addProduct } from "../controllers/productCtrl.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.post("/addProduct", addProduct);

export default router;
