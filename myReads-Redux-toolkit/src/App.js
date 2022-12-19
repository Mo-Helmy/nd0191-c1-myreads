import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import BookPage from './components/BookPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ListBooks />} />

      <Route path="/search" element={<SearchBooks />} />

      <Route path="/book/:bookId" element={<BookPage />} />
    </Routes>
  );
};

export default App;
