import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCategories, addCategory, deleteCategory } from './operations';

const getActions = type => isAnyOf(fetchCategories[type], addCategory[type], deleteCategory[type]);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
    extraReducers: builder =>
    builder
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.push(payload);
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        return state.filter(category => category.id !== payload.id);
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const categoriesReducer = categoriesSlice.reducer;