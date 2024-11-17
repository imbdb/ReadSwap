"use client";
import React from "react";

export interface BookCardProps {
  title: string;
  imageUrl?: string;
  isbn?: string;
  pages?: number;
  condition?: string;
}

const BookCard: React.FC<{ book: BookCardProps }> = ({ book }) => {
  // eslint-disable-next-line prefer-const
  let { title, imageUrl, isbn, pages, condition } = book;
  imageUrl = imageUrl || "/images/sample-book.jpg";
  isbn = isbn || "-";
  pages = pages;
  condition = condition || "Unknown";
  return (
    <div className="flex items-center p-4 bg-white">
      <div
        className="w-24 h-32 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="ml-4">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
        {isbn && <div className="text-sm text-gray-600">ISBN: {isbn}</div>}
        <div className="text-sm text-gray-600">Pages: {pages ?? "-"}</div>
        {condition && (
          <div className="text-sm text-gray-600">Condition: {condition}</div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
