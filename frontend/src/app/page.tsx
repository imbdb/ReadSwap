"use client";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import BookList from "./components/book-list";
import { useAuthStore } from "./stores/authStore";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const authenticated = useAuthStore((state) => state.authenticated);

  const handleSearchChange = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 300);

  useEffect(() => {
    return () => {
      handleSearchChange.cancel();
    };
  });

  useEffect(() => {
    if (authenticated) {
      // loadUser();
    }
  }, [authenticated]);

  return (
    <div className="p-4">
      <div className="w-full mb-5">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full p-2 text-lg border border-gray-300 rounded"
          onChange={handleSearchChange}
        />
      </div>
      <BookList searchTerm={searchTerm} />
    </div>
  );
}
