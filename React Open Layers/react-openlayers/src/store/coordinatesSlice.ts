// With God's Help

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  coordiantes: number[];
}

const initialState: InitialState = {
  coordiantes: [0, 0],
};

export const slice = createSlice({
  name: "coordinatesSlice",
  initialState: initialState,
  reducers: {
    setCoordinates: (state: InitialState, action: PayloadAction<number[]>) => {
      state.coordiantes = action.payload;
      return state;
    },
  },
});

export const { setCoordinates } = slice.actions;
export default slice.reducer;
