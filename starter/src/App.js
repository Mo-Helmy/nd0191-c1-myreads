import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import * as booksApi from './BooksAPI';
import BookPage from './components/BookPage';

const App = () => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const result = await booksApi.getAll();
      const currentlyReading = result.filter(
        (book) => book.shelf === 'currentlyReading'
      );
      const wantToRead = result.filter((book) => book.shelf === 'wantToRead');
      const read = result.filter((book) => book.shelf === 'read');
      setCurrentlyReading(currentlyReading);
      setWantToRead(wantToRead);
      setRead(read);
      setIsLoading(false);
    };

    getBooks();
    setIsUpdate(false);
  }, [isUpdate]);

  const updateBookShelf = (book, shelf) => {
    booksApi.update(book, shelf);
    setIsUpdate(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ListBooks
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            onUpdateBookShelf={updateBookShelf}
            isLoading={isLoading}
          />
        }
      />

      <Route
        path="/search"
        element={
          <SearchBooks
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            onUpdateBookShelf={updateBookShelf}
          />
        }
      />

      <Route
        path="/book/:bookId"
        element={
          <BookPage
            wantToRead={wantToRead}
            currentlyReading={currentlyReading}
            read={read}
            onUpdateBookShelf={updateBookShelf}
          />
        }
      />
    </Routes>
  );
};

export default App;
