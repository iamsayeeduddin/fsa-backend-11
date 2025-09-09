import express from "express";
import bookRouter from "./routes/booksRoute.js";

const PORT = 5000;
const app = express();

app.listen(PORT, () => console.log(`Server up & running on PORT ${PORT}`));
app.use(express.json());

// app.get("/books", (req, res, next) => {
//   res.status(200).json(books);
// });

app.use("/books", bookRouter);
