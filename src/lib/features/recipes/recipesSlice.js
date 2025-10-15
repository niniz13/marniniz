import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./fetchRecipes";
import { fetchCategories } from "./fetchCategories";
import { fetchRecipesByCategory } from "./fetchRecipesByCategory";
import { fetchRecipeById } from "./fetchRecipeById";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    categories: [],
    selectedRecipe: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchRecipesByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchRecipeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
