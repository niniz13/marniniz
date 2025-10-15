import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals[0];
  }
);
