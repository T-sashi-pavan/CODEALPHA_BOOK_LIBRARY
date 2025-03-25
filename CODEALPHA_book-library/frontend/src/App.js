import React, { useState, useEffect } from "react";
import { fetchBooks, addBook, borrowBook, deleteBook } from "./services/bookService";
import "./App.css";

function App() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", category: "" });
    const [activeCategory, setActiveCategory] = useState("Fiction");
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["Fiction", "Comedy", "History", "Novels", "Fantasy", "Science", "Biography"];

    useEffect(() => {
        fetchBooks().then(setBooks);
    }, []);

    const handleAddBook = async () => {
        const addedBook = await addBook(newBook);
        setBooks(await fetchBooks());
        setNewBook({ title: "", author: "", category: "" });
        setShowAddForm(false);
        
        const user = prompt("Enter your name to borrow this book:");
        if (user) {
            await borrowBook(addedBook._id, user);
            setBooks(await fetchBooks());
        }
    };

    const handleBorrowBook = async (id) => {
        const user = prompt("Enter your name to borrow this book:");
        if (user) {
            await borrowBook(id, user);
            setBooks(await fetchBooks());
        }
    };

    const handleDeleteBook = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            setBooks(await fetchBooks());
        }
    };

    const filteredBooks = books.filter(book => {
        // Filter by category first
        const categoryMatch = book.category && 
                            book.category.toLowerCase() === activeCategory.toLowerCase();
        
        // Then filter by search query if it exists
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const titleMatch = book.title.toLowerCase().includes(query);
            const authorMatch = book.author.toLowerCase().includes(query);
            return categoryMatch && (titleMatch || authorMatch);
        }
        
        return categoryMatch;
    });

    return (
        <div className="app-container">
                      <header>
                <h1>📚 Book Library</h1>
                
                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <nav className="category-nav">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={activeCategory === category ? "active" : ""}
                            onClick={() => {
                                setActiveCategory(category);
                                setSearchQuery(""); // Clear search when changing category
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
            </header>


            <main>
                <button className="toggle-form-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Hide Add Book Form" : "Add New Book"}
                </button>

                {showAddForm && (
                    <div className="add-book-form">
                        <h2>Add New Book</h2>
                        <input 
                            placeholder="Title" 
                            value={newBook.title}
                            onChange={(e) => setNewBook({...newBook, title: e.target.value})} 
                        />
                        <input 
                            placeholder="Author" 
                            value={newBook.author}
                            onChange={(e) => setNewBook({...newBook, author: e.target.value})} 
                        />
                        <select
                            value={newBook.category}
                            onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <button onClick={handleAddBook}>Add Book</button>
                    </div>
                )}

                <h2 className="category-title">{activeCategory} Books</h2>
                
                <div className="books-grid">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div key={book._id} className="book-card">
                                <div className="book-cover">
                                    <div className="book-cover-content">
                                        {book.title}
                                    </div>
                                </div>
                                <h3>{book.title}</h3>
                                <p className="book-author">{book.author}</p>
                                <div className="book-actions">
                                    <button className="purchase-btn">Rent</button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteBook(book._id)}
                                    >
                                        Read
                                    </button>
                                    <button 
                                        className="rent-btn"
                                        onClick={() => handleBorrowBook(book._id)}
                                    >
                                        {book.borrowed ? "Borrowed" : "Borrow"}
                                    </button>
                                </div>
                                {book.borrowed && (
                                    <p className="borrowed-status">Borrowed by {book.borrowedBy}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-books">No books available in this category</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;