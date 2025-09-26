import express from "express";
import bookRouter from "./routes/booksRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import mongoose from "mongoose";

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

app.use("/products", productRouter);
app.use("/users", userRouter);
