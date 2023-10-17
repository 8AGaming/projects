// With God's Help

import { configureStore } from "@reduxjs/toolkit";
import coordinatesSlice from "./coordinatesSlice";

export const store = configureStore({
  reducer: {
    coordiantes: coordinatesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
