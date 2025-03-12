import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";
import { eventsApi } from "./api/eventsApi";

export const store = configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        eventsApi.middleware
    ),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;