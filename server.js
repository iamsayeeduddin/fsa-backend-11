import express from "express";
import bookRouter from "./routes/booksRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import mongoose from "mongoose";
import { verifyToken } from "./utils/crypt.js";

const PORT = 5000;
const app = express();

app.listen(PORT, () => console.log(`Server up & running on PORT ${PORT}`));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/fsa-11", { autoIndex: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

// app.get("/books", (req, res, next) => {
//   res.status(200).json(books);
// });

// MIDDLEWARE

app.use("/books", bookRouter);

app.use((req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let isVerifiedToken = verifyToken(token);
      if (isVerifiedToken) {
        next();
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

app.use("/products", productRouter);
app.use("/users", userRouter);
