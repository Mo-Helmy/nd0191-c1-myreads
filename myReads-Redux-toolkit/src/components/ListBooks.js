import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookShelf from './BookShelf';
import Spinner from './ui/Spinner';
import { getAllBooksAction } from '../store/booksSlice';

const ListBooks = () => {
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.books.myBooks);
  const isFetching = useSelector((state) => state.ui.isFetchMyBooks);
  const isUpdating = useSelector((state) => state.ui.isUpdatingBookShelf);

  console.log(myBooks);

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {isFetching || isUpdating ? (
            <Spinner />
          ) : (
            <>
              <BookShelf books={myBooks[0].books} title="Currently Reading" />
              <BookShelf books={myBooks[1].books} title="Want to Read" />
              <BookShelf books={myBooks[2].books} title="Read" />
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
