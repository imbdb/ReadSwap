"use client";
import toast from "react-hot-toast";
import ExchangeCard from "./exchange-card";
import { useEffect, useState } from "react";

export default function BookList({
  searchTerm,
}: {
  searchTerm: string;
}): JSX.Element {
  const [books, setBooks] = useState([]);
  const loadBooks = async () => {
    const books = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/all?search=${searchTerm}`
      )
    ).json();
    setBooks(books);
  };
  useEffect(() => {
    loadBooks();
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {books.length > 0 ? (
        books.map((book, index) => (
          <ExchangeCard
            key={index}
            book={book}
            onRequestExchange={function (): void {
              toast.error("Not implemented yet");
            }}
          />
        ))
      ) : (
        <div className="text-center col-span-4">No books found</div>
      )}
    </div>
  );
}
