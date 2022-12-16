import React from 'react';
import Book from './Book';

const BookShelf = ({ title, books, onUpdateBookShelf, wantToRead }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book
              book={book}
              key={book.id}
              onUpdateBookShelf={onUpdateBookShelf}
              wantToRead={wantToRead}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
