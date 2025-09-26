import express from "express";
import { getAllProducts, addProduct, updateProduct, deleteProduct, getPaginatedProducts } from "../controllers/productCtrl.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.get("/allProducts/:page/:pageSize", getPaginatedProducts);

router.post("/addProduct", isLoggedIn, isAdmin, addProduct);
router.patch("/updateProduct/:id", isLoggedIn, updateProduct);
router.delete("/deleteProduct/:id", isLoggedIn, deleteProduct);

export default router;
