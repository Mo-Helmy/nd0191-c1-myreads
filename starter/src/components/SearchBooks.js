import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as booksApi from '../BooksAPI';
import Book from './Book';
import Spinner from './ui/Spinner';

const SearchBooks = ({
  onUpdateBookShelf,
  currentlyReading,
  wantToRead,
  read,
}) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        booksApi.search(query, 10).then((res) => {
          setBooks(res);
        });
      }, 1500);

      return () => {
        setIsLoading(true);
        clearTimeout(timer);
      };
    } else {
      setBooks([]);
      setIsLoading(false);
    }
  }, [query]);

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query.current}
            onChange={changeHandler}
            autoFocus
          />
        </div>
      </div>
      <div className="search-books-results">
        {isLoading && <Spinner />}
        <ol className="books-grid">
          {books.error === 'empty query' || books.length === 0 ? (
            <h2>No Books Found...</h2>
          ) : (
            books.map((book, index) => (
              <Book
                book={book}
                key={book.id}
                onUpdateBookShelf={onUpdateBookShelf}
                wantToRead={wantToRead}
                currentlyReading={currentlyReading}
                read={read}
              />
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
