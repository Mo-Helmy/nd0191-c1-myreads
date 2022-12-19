import React, { useEffect, useState } from 'react';
import * as booksApi from '../BooksAPI';

const MyReadsContext = React.createContext({
  currentlyReading: [],
  wantToRead: [],
  read: [],

  isLoading: false,

  updateMyReads: () => {},
});

export const MyReadsContextProvider = (props) => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [Updating, setUpdating] = useState(false);

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
    setUpdating(false);
  }, [Updating]);

  const updateBookShelf = (book, shelf) => {
    booksApi.update(book, shelf);
    setUpdating(true);
  };
  return (
    <MyReadsContext.Provider
      value={{
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,

        isLoading: isLoading,

        updateMyReads: updateBookShelf,
      }}
    >
      {props.children}
    </MyReadsContext.Provider>
  );
};

export default MyReadsContext;
