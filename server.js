import express from "express";
import bookRouter from "./routes/booksRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const app = express();

app.listen(PORT, () => console.log(`Server up & running on PORT ${PORT}`));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL, { autoIndex: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

// app.get("/books", (req, res, next) => {
//   res.status(200).json(books);
// });

const logsPath = path.join(__dirname, "logs");
if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}
// MIDDLEWARE

const reqLogPath = path.join(logsPath, "request.log");
const reqLogStream = fs.createWriteStream(reqLogPath, { flags: "a" });

app.use(morgan("tiny", { stream: reqLogStream }));

app.use("/books", bookRouter);

app.use("/products", productRouter);
app.use("/users", userRouter);

// LOGGING
