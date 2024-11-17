"use client";
import BookCard from "./book-card";

export default function Books({ books }: { books: any }): JSX.Element {
  const filteredBooks = books;
  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredBooks.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}
