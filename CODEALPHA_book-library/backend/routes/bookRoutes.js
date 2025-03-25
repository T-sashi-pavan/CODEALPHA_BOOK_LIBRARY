const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a new book
router.post("/", async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
});

// Borrow a book
router.put("/borrow/:id", async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, {
        borrowed: true,
        borrowedBy: req.body.borrowedBy,
        borrowedDate: new Date(),
    }, { new: true });
    res.json(book);
});

module.exports = router;
