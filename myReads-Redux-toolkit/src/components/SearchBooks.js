import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as booksApi from '../BooksAPI';
import Book from './Book';
import Spinner from './ui/Spinner';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isUpdating = useSelector((state) => state.ui.isUpdatingBookShelf);

  console.log(books);

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
            value={query}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        {isLoading || isUpdating ? <Spinner /> : ''}
        <ol className="books-grid">
          {books.error === 'empty query' || books.length === 0 ? (
            <h2>No Books Found...</h2>
          ) : (
            books.map((book) => <Book book={book} key={book.id} />)
          )}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
