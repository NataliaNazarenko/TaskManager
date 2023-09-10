import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../categories/operations';
import { fetchTasks } from '../tasks/operations';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const uniqueToken = uuidv4();


const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    
    const res = { data: { token: uniqueToken } };
    setAuthHeader(res.data.token);
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const savedCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (savedCredentials) {
      const res = { data: { token: uniqueToken } };
      setAuthHeader(res.data.token);

      const categories = await thunkAPI.dispatch(fetchCategories());
      const tasks = await thunkAPI.dispatch(fetchTasks());

      return { userData: res.data, categories, tasks };
    } else {
      return thunkAPI.rejectWithValue('User credentials not found');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    clearAuthHeader();
    return true; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const res = { data: { updatedUserData: 'testData' } };

    const categories = await fetchCategories();
    const tasks = await fetchTasks();
    
    return { updatedUserData: res.data.updatedUserData, categories, tasks };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
