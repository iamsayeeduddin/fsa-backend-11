import express from "express";
import { addBook, getAllBooks, updateBook, deleteBook } from "../controllers/bookCtrl.js";

const router = express.Router();

router.get("/allBooks", getAllBooks);
router.post("/addBook", addBook);
router.patch("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

export default router;
