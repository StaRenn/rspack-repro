import { configureStore } from '@reduxjs/toolkit';

export const createStore = () => {
  const store = configureStore({
    reducer: {},
  });

  return store;
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = ReturnType<typeof store.dispatch>;
