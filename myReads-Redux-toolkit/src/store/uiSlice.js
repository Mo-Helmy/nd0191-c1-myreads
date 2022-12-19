import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isFetchMyBooks: false,
    isUpdatingBookShelf: false,
  },
  reducers: {
    fetchingMyBooksStatus(state, action) {
      state.isFetchMyBooks = action.payload;
    },
    updatingBookShelfStatus(state, action) {
      state.isUpdatingBookShelf = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
