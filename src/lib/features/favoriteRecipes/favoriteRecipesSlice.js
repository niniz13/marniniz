import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


// Vérifier si une recette est favorite
export const checkFavorite = createAsyncThunk(
  "favorites/checkFavorite",
  async ({ recipeId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/favorites/${recipeId}`, {
        credentials: "include",
      });
      if (!res.ok) return rejectWithValue("Erreur serveur");
      const data = await res.json();
      return { recipeId, favorite: data.favorite };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Ajouter / retirer une recette des favoris
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ recipeId, t, session }, { rejectWithValue }) => {
    if (!session?.user?.id) {
      toast.error(t("mustBeLoggedIn"));
      return rejectWithValue("Non connecté");
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(
          data.favorite ? t("addedToFavorites") : t("removedFromFavorites")
        );
        return { recipeId, favorite: data.favorite };
      } else {
        toast.error(data.favorite ? t("favoriteError") : t("unfavoriteError"));
        return rejectWithValue("Erreur API");
      }
    } catch (err) {
      console.error("Erreur favoris :", err);
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check
      .addCase(checkFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { recipeId, favorite } = action.payload;
        state.favorites[recipeId] = favorite;
      })
      .addCase(checkFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { recipeId, favorite } = action.payload;
        state.favorites[recipeId] = favorite;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
