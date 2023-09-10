import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchAll', (_, thunkAPI) => {
    try {
      const categories = JSON.parse(localStorage.getItem('categories')) || [];
      return categories;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });
  
  
  export const addCategory = createAsyncThunk(
    'categories/addCategory',
    ({ name }, thunkAPI) => {
      try {
        const newCategory = { id: Date.now(), name }; 
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const updatedCategories = [...categories, newCategory];
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        return newCategory;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
  
  
  export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    (categoryId, thunkAPI) => {
      try {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const updatedCategories = categories.filter(category => category.id !== categoryId);
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        return { id: categoryId };
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );