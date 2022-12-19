import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as booksApi from '../BooksAPI';
import MyReadsContext from '../store/myReadsContext';

import classes from './BookPage.module.css';
import Spinner from './ui/Spinner';

const BookPage = () => {
  const myReadsCtx = useContext(MyReadsContext);

  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let defaultValue;

  const params = useParams();
  const bookId = params.bookId;

  const imageLink = `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w480-h686`;

  if (myReadsCtx.wantToRead && myReadsCtx.wantToRead.length > 0) {
    for (const b of myReadsCtx.wantToRead) {
      if (bookId === b.id) defaultValue = 'wantToRead';
    }
  }
  if (myReadsCtx.currentlyReading && myReadsCtx.currentlyReading.length > 0) {
    for (const b of myReadsCtx.currentlyReading) {
      if (bookId === b.id) defaultValue = 'currentlyReading';
    }
  }
  if (myReadsCtx.read && myReadsCtx.read.length > 0) {
    for (const b of myReadsCtx.read) {
      if (bookId === b.id) defaultValue = 'read';
    }
  }

  useEffect(() => {
    const getBook = async (bookId) => {
      setIsLoading(true);
      const res = await booksApi.get(bookId);
      setBook(res);
      setIsLoading(false);
    };
    getBook(bookId);
  }, [bookId]);

  const changeBookShelfHandler = (e) => {
    myReadsCtx.updateMyReads(book, e.target.value);
  };

  return (
    <>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      </div>
      {isLoading || myReadsCtx.isLoading ? <Spinner /> : ''}
      {book && (
        <div className={classes.book_page}>
          <div className={classes.sec_one}>
            <div className={classes.book_img}>
              <img src={imageLink} alt={book.title} />
            </div>
            <div className={classes.info}>
              <div className={classes.info1}>
                <a href={`${book.infoLink}`}>
                  <h2>{book.title}</h2>
                </a>
                <div className={classes.author_publisher}>
                  <p className={classes.author}>{book.authors?.join(' - ')}</p>
                  <p className={classes.publisher}>
                    {book.publisher} | {book.publishedDate}
                  </p>
                </div>
              </div>
              <div className={classes.info2}>
                <div className={classes.sec}>
                  <span>{book.language}</span>
                  <span>Language</span>
                </div>
                <div className={classes.sec}>
                  <span>{book.pageCount}</span>
                  <span>Pages</span>
                </div>
              </div>
              <div className={classes.book_shelf_changer}>
                <label htmlFor="book-shelf">Add To MyReads</label>
                <div className="book-shelf-changer" id="book-shelf">
                  <select
                    defaultValue={
                      defaultValue ? defaultValue : book.shelf || 'none'
                    }
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
              <div className={classes.preview}>
                <a href={book.previewLink}>Preview Book</a>
              </div>
            </div>
          </div>
          <div className={classes.sec_two}>
            <h3>
              About this eBook <span></span>
            </h3>
            <div className={classes.description}>{book.description}</div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BookPage;
