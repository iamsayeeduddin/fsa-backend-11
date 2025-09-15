let books = [
  {
    id: 1,
    name: "HTML CSS",
    price: 98,
  },
  {
    id: 2,
    name: "JS",
    price: 200,
  },
];

const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

const addBook = (req, res) => {
  let book = {
    id: (books[books.length - 1]?.id || 0) + 1,
    ...req.body,
  };
  books.push(book);
  res.status(201).json(books);
};

const updateBook = (req, res) => {
  let bookId = +req.params.id;
  let idx = books.findIndex((val) => val.id === bookId);
  if (idx > -1) {
    books[idx] = {
      ...books[idx],
      ...req.body,
    };
    res.status(200).json({ books, message: "Book Updated Successfully!" });
  } else {
    res
      .status(404)
      .json({ message: `Book does not exist with the id: ${bookId}!` });
  }
};

const deleteBook = (req, res) => {
  let bookId = +req.params.id;
  let idx = books.findIndex((val) => val.id === bookId);
  if (idx > -1) {
    books.splice(idx, 1);
    res.status(200).json({ books, message: "Book Deleted Successfully!" });
  } else {
    res
      .status(404)
      .json({ message: `Book does not exist with the id: ${bookId}!` });
  }
};

export { getAllBooks, addBook, updateBook, deleteBook };
