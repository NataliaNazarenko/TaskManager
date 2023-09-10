import { createSelector } from '@reduxjs/toolkit';

export const getCategories = state => state.categories;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getCategoryById = createSelector(
  [getCategories, (_, categoryId) => categoryId],
  (categories, categoryId) => {
    return categories.find(category => category.id === categoryId) || null;
  }
);