"use client";
import React from "react";
import BookCard, { BookCardProps } from "./book-card";

interface ExchangeCardProps {
  book: BookCardProps;
  onRequestExchange: () => void;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  book,
  onRequestExchange,
}) => {
  return (
    <div className="exchange-card p-4 border rounded-lg shadow-md">
      <BookCard book={book} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onRequestExchange}
      >
        Request Exchange
      </button>
      <button
        className="ml-4 mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={onRequestExchange}
      >
        Borrow
      </button>
    </div>
  );
};

export default ExchangeCard;
