import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import * as booksApi from './BooksAPI';
import BookPage from './components/BookPage';

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const result = await booksApi.getAll();
      setAllBooks(result);
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
  }, []);

  const updateBookShelf = async (book, shelf) => {
    setIsLoading(true);

    await booksApi.update({ ...book, shelf }, shelf);

    const updatedAllBooks = allBooks.map((b) => {
      if (b.id === book.id) {
        return { ...b, shelf };
      } else {
        return b;
      }
    });
    setAllBooks(updatedAllBooks);

    const currentlyReading = updatedAllBooks.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wantToRead = updatedAllBooks.filter(
      (book) => book.shelf === 'wantToRead'
    );
    const read = updatedAllBooks.filter((book) => book.shelf === 'read');
    setCurrentlyReading(currentlyReading);
    setWantToRead(wantToRead);
    setRead(read);
    setIsLoading(false);
  };

  console.log(isLoading);

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
            isUpdating={isLoading}
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
