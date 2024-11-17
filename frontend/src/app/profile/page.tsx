"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { authHttp } from "../utils";
import AddBook from "../components/add-book";
import Books from "../components/books";

const UserProfile = () => {
  const authenticated = useAuthStore((state) => state.authenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteGenre: "",
    location: "",
  });
  const [booksOwned, setBooksOwned] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddWish, setShowAddWish] = useState(false);

  const loadUser = async () => {
    const userInfo = await authHttp.get(`/users/me`);
    setUser(userInfo.data);
  };

  const loadBooks = async () => {
    const books = await authHttp.get(`/books/me`);
    setBooksOwned(books.data.filter((book) => book.wishlist === false));
    setWishlist(books.data.filter((book) => book.wishlist === true));
  };

  useEffect(() => {
    if (authenticated) {
      loadUser();
      loadBooks();
    }
  }, [authenticated]);

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      favoriteGenre: user?.favoriteGenre || "",
      location: user?.location || "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    await authHttp.patch(`/users/me`, formData);
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Favorite Genre:</label>
            <input
              type="text"
              name="favoriteGenre"
              value={formData.favoriteGenre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 ml-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <p className="text-lg">{user?.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Favorite Genre:</label>
            <p className="text-lg">{user?.favoriteGenre || "N/A"}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <p className="text-lg">{user?.location || "N/A"}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Owned Books</h2>

        <button
          onClick={() => setShowAddBook(true)}
          className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
        >
          Add Book
        </button>

        {showAddBook && (
          <AddBook onAdd={loadBooks} onClose={() => setShowAddBook(false)} />
        )}

        <div className="mt-4">
          {booksOwned.length > 0 ? (
            <Books books={booksOwned} />
          ) : (
            <p>No books owned.</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Wishlist Books</h2>
        <button
          onClick={() => setShowAddWish(true)}
          className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
        >
          Add Book
        </button>

        {showAddWish && (
          <AddBook
            iswishlist={true}
            onClose={() => setShowAddWish(false)}
            onAdd={loadBooks}
          />
        )}
        <div className="mt-4">
          {booksOwned.length > 0 ? (
            <Books books={wishlist} />
          ) : (
            <p>No books owned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
