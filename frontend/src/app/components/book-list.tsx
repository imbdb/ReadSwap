"use client";
import toast from "react-hot-toast";
import ExchangeCard from "./exchange-card";

const mockBooks = [
  {
    title: "The Great Gatsby",
    imageUrl: "/images/sample-book.jpg",
    isbn: "9780743273565",
    pages: 180,
    condition: "Good",
  },
  {
    title: "The Catcher in the Rye",
    imageUrl: "/images/sample-book.jpg",
    isbn: "9780743273565",
    pages: 180,
    condition: "Good",
  },
  {
    title: "To Kill a Mockingbird",
    imageUrl: "/images/sample-book.jpg",
    isbn: "9780743273565",
    pages: 180,
    condition: "Good",
  },
  {
    title: "1984",
    imageUrl: "/images/sample-book.jpg",
    isbn: "9780743273565",
    pages: 180,
    condition: "Good",
  },
  {
    title: "Pride and Prejudice",
    imageUrl: "/images/sample-book.jpg",
    isbn: "9780743273565",
    pages: 180,
    condition: "Good",
  },
  {
    title: "The Hobbit",
  },
];

export default function BookList({
  searchTerm,
}: {
  searchTerm: string;
}): JSX.Element {
  const filteredBooks = mockBooks.filter((book) => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredBooks.map((book, index) => (
        <ExchangeCard
          key={index}
          book={book}
          onRequestExchange={function (): void {
            toast.error("Not implemented yet");
          }}
        />
      ))}
    </div>
  );
}
