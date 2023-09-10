import { createAsyncThunk } from '@reduxjs/toolkit';

const getTasksFromLocalStorage = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
  } catch (e) {
    throw new Error(e.message);
  }
};

const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    throw new Error(e.message);
  }
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', (_, thunkAPI) => {
  try {
    return getTasksFromLocalStorage();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', (task, thunkAPI) => {
  try {
    const newTask = { ...task, id: Date.now() };
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = [...tasks, newTask];
    saveTasksToLocalStorage(updatedTasks);
    return newTask;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', (taskId, thunkAPI) => {
  try {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);
    return taskId;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});