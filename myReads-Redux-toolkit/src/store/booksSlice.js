import { getAll, update } from '../BooksAPI';
import { uiActions } from './uiSlice';

const { createSlice } = require('@reduxjs/toolkit');

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    allMyBooks: [],
    myBooks: [
      { shelf: 'currentlyReading', books: [] },
      { shelf: 'wantToRead', books: [] },
      { shelf: 'read', books: [] },
    ],
  },
  reducers: {
    updateMyBooks(state, action) {
      const books = action.payload;

      state.allMyBooks = books;

      state.myBooks[0].books = state.allMyBooks.filter(
        (book) => book.shelf === 'currentlyReading'
      );
      state.myBooks[1].books = state.allMyBooks.filter(
        (book) => book.shelf === 'wantToRead'
      );
      state.myBooks[2].books = state.allMyBooks.filter(
        (book) => book.shelf === 'read'
      );
    },
    updateBookShelfUi(state, action) {
      const { book, shelf } = action.payload;

      let allMyBooks = state.allMyBooks;

      allMyBooks.forEach((b) => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
      });

      state.allMyBooks = allMyBooks;

      state.myBooks[0].books = state.allMyBooks.filter(
        (book) => book.shelf === 'currentlyReading'
      );
      state.myBooks[1].books = state.allMyBooks.filter(
        (book) => book.shelf === 'wantToRead'
      );
      state.myBooks[2].books = state.allMyBooks.filter(
        (book) => book.shelf === 'read'
      );
    },
  },
});

export const getAllBooksAction = () => async (dispatch) => {
  dispatch(uiActions.fetchingMyBooksStatus(true));
  try {
    const result = await getAll();
    dispatch(booksActions.updateMyBooks(result));
  } catch (error) {
  } finally {
    dispatch(uiActions.fetchingMyBooksStatus(false));
  }
};

export const updateBookShelfAction = (book, shelf) => async (dispatch) => {
  dispatch(uiActions.updatingBookShelfStatus(true));
  try {
    await update({ ...book, shelf }, shelf);
    dispatch(booksActions.updateBookShelfUi({ book, shelf }));
  } catch (error) {
  } finally {
    dispatch(uiActions.updatingBookShelfStatus(false));
  }
};

export const booksActions = booksSlice.actions;

export default booksSlice;
