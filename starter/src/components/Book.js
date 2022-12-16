import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Book = ({
  book,
  onUpdateBookShelf,
  wantToRead,
  currentlyReading,
  read,
}) => {
  const location = useLocation();

  let defaultValue;

  if (wantToRead) {
    for (const b of wantToRead) {
      if (book.id === b.id) defaultValue = 'wantToRead';
    }
  }
  if (currentlyReading) {
    for (const b of currentlyReading) {
      if (book.id === b.id) defaultValue = 'currentlyReading';
    }
  }
  if (read) {
    for (const b of read) {
      if (book.id === b.id) defaultValue = 'read';
    }
  }

  const changeBookShelfHandler = (e) => {
    onUpdateBookShelf(book, e.target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link
            to={
              location.pathname === '/search'
                ? `../book/${book.id}`
                : location.pathname === '/'
                ? `book/${book.id}`
                : '/'
            }
          >
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks?.smallThumbnail})`,
              }}
            ></div>
          </Link>
          <div className="book-shelf-changer">
            <select
              defaultValue={defaultValue ? defaultValue : book.shelf || 'none'}
              onChange={changeBookShelfHandler}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(' - ')}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
