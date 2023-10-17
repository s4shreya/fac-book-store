import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for creating new book
// as interacting with mongodb is an asynchronous process we use async await
router.post("/", async (request, response) => {
  try {
    // checking for any null entries
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Complete all required fields: Title, Author and Publish Year!",
      });
    }

    // Storing the values in a new variable
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // create a document with newBook details and save it to book variable
    const book = await Book.create(newBook);

    return response.status(201).send({ booksname: book });
  } catch (error) {
    // handling any error encountered
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all books from database
router.get("/", async (request, response) => {
  try {
    // gets the list of all books in Books model
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting the book details by ID
router.get("/:id", async (request, response) => {
  try {
    // destructuring id from request params
    const { id } = request.params;

    // getting the book that matches the id
    const book = await Book.findById(id);

    return response.status(200).json({
      data: book,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Complete the required fields",
      });
    }

    const { id } = request.params;

    // updating the book details
    const updatedBook = await Book.findByIdAndUpdate(id, request.body);

    // when the book with the given id is not present in the database
    if (!updatedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting book with id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    const books = await Book.find({});

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response
      .status(200)
      .send({ message: "Book deleted successfully!", count: books.length });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;