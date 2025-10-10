import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (searchTerm = "") => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
    const data = await response.json();
    return data.meals || [];
  }
);
