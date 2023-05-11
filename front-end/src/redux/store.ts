import { configureStore } from "@reduxjs/toolkit";

import lotsReducer  from "./reducers/lot";

export const store = configureStore({
  reducer: {
    lotsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
