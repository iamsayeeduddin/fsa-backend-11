import express from "express";
import { deleteUser, getUserById, getUsers, updateUser, createUser, login } from "../controllers/userCtrl.js";

const router = express.Router();

router.get("/allUsers", getUsers);
router.get("/:id", getUserById);
router.post("/createUser", createUser);
router.post("/login", login);
router.patch("/updateUser/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
