import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import Spinner from './ui/Spinner';

const ListBooks = ({
  currentlyReading,
  wantToRead,
  read,
  onUpdateBookShelf,
  isLoading,
}) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <BookShelf
                books={currentlyReading}
                title="Currently Reading"
                onUpdateBookShelf={onUpdateBookShelf}
              />
              <BookShelf
                books={wantToRead}
                title="Want to Read"
                onUpdateBookShelf={onUpdateBookShelf}
                wantToRead={wantToRead}
              />
              <BookShelf
                books={read}
                title="Read"
                onUpdateBookShelf={onUpdateBookShelf}
              />
            </>
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
