import { createSlice } from "@reduxjs/toolkit";

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
    
  },
});

export default recipesSlice.reducer;
