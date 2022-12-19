import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyReadsContext from '../store/myReadsContext';
import BookShelf from './BookShelf';
import Spinner from './ui/Spinner';

const ListBooks = () => {
  const myReadsCtx = useContext(MyReadsContext);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {myReadsCtx.isLoading ? (
            <Spinner />
          ) : (
            <>
              <BookShelf
                books={myReadsCtx.currentlyReading}
                title="Currently Reading"
              />
              <BookShelf books={myReadsCtx.wantToRead} title="Want to Read" />
              <BookShelf books={myReadsCtx.read} title="Read" />
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
