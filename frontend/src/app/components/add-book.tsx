"use client";
import React, { useState } from "react";
import { authHttp } from "../utils";

interface AddBookProps {
  onAdd: () => Promise<void>;

  onClose: () => void;

  iswishlist?: boolean;
}

const AddBook: React.FC = ({ iswishlist, onAdd, onClose }: AddBookProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, author, genre, wishlist: iswishlist };
    await authHttp.post("/books", newBook);
    console.log("Book added:", newBook);
    // Add your logic to handle the new book addition here
    setTitle("");
    setAuthor("");
    setGenre("");
    onAdd();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 font-bold mb-2"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Genre:
          </label>
          <input
            id="description"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default AddBook;
