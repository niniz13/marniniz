import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from 'react';
import recipesReducer from "./recipes/recipesSlice";

let store;

const initialState = {
  recipes: {
    items: [],
    status: 'idle',
    error: null,
  },
};

function initStore(preloadedState = initialState) {
  return configureStore({
    reducer: {
      recipes: recipesReducer,
    },
    preloadedState,
  });
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;
  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export default initializeStore;
