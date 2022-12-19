import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './booksSlice';
import uiSlice from './uiSlice';

const store = configureStore({
  reducer: { books: booksSlice.reducer, ui: uiSlice.reducer },
});

export default store;
