const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    borrowed: { type: Boolean, default: false },
    borrowedBy: { type: String, default: "" },
    borrowedDate: { type: Date }
});

module.exports = mongoose.model("Book", bookSchema);
