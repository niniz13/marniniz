import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (search, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);