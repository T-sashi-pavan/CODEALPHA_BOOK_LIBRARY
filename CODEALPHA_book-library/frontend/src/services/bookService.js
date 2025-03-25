import axios from "axios";

const API_URL = "http://localhost:5000/books";

export const fetchBooks = async () => (await axios.get(API_URL)).data;
export const addBook = async (book) => (await axios.post(API_URL, book)).data;
export const borrowBook = async (id, user) =>
    (await axios.put(`${API_URL}/borrow/${id}`, { borrowedBy: user })).data;
export const deleteBook = async (id) => {
    const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
};