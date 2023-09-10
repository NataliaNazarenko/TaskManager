import { createSelector } from '@reduxjs/toolkit';

export const getTasks = state => state.tasks.items;

export const getIsLoading = state => state.tasks.isLoading || false;

export const getError = state => state.tasks.error;

export const getTaskById = createSelector(
  [getTasks, (_, taskId) => taskId],
  (tasks, taskId) => {
    return tasks.find(task => task.id === taskId) || null;
  }
);