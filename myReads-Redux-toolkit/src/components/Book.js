import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { updateBookShelfAction } from '../store/booksSlice';

const Book = ({ book }) => {
  const location = useLocation();
  const myBooks = useSelector((state) => state.books.myBooks);
  const dispatch = useDispatch();

  let defaultValue;

  if (myBooks[0]?.books) {
    for (const b of myBooks[0].books) {
      if (book.id === b.id) defaultValue = 'currentlyReading';
    }
  }
  if (myBooks[1]?.books) {
    for (const b of myBooks[1].books) {
      if (book.id === b.id) defaultValue = 'wantToRead';
    }
  }
  if (myBooks[2]?.books) {
    for (const b of myBooks[2].books) {
      if (book.id === b.id) defaultValue = 'read';
    }
  }

  const changeBookShelfHandler = (e) => {
    dispatch(updateBookShelfAction(book, e.target.value));
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

export default Book;
