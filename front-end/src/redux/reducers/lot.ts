import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Lot } from "src/types/Lot";

const initialState: Lot[] = [];

export const fetchLots = createAsyncThunk("fetchLots", async () => {
  const responce = await axios.get("http://127.0.0.1:8000/api/lots/");
  return responce.data;
});

const lotsSlice = createSlice({
  name: "lotsSlice",
  initialState,
  reducers: {
    addToLots: (state, action: PayloadAction<Lot>) => {
      const updatedLots = [...state, action.payload];
      return updatedLots;
    },
    deleteLot: (state, action: PayloadAction<number>) => {
      const updatedLots = state.filter((item) => item.id !== action.payload);
      return updatedLots;
    },
    updateLotStatus: (state, action: PayloadAction<Lot>) => {
      const updatedLots = state.filter((item) => item.id !== action.payload.id);
      const updatedLotList = [...updatedLots, action.payload];
      return updatedLotList;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchLots.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const lotsReducer = lotsSlice.reducer;
export const { addToLots, deleteLot, updateLotStatus } = lotsSlice.actions;
export default lotsReducer;
