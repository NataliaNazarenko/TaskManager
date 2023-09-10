import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask } from './operations';

const getActions = type => isAnyOf(fetchTasks[type], addTask[type], deleteTask[type]);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],  
    isLoading: false,
    error: null,
  },
  
    extraReducers: builder =>
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(task => task.id !== payload);
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

export const { addTaskEl, deleteTaskEl } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;