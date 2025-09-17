import express from "express";
import { getAllProducts, addProduct, updateProduct, deleteProduct, getPaginatedProducts } from "../controllers/productCtrl.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.get("/allProducts/:page/:pageSize", getPaginatedProducts);
router.post("/addProduct", addProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
