import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10,
  },
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
    addAmount: (state, action) => {
      state.value = state.value + action.payload;
    },
    addIfOdd: (state, action) => {
      if (action.payload % 2) {
        state.value = state.value + action.payload;
      }
    },
  },
});

export const { increment, decrement, addAmount, addIfOdd } =
  counterSlice.actions;
export const counterReducer = counterSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;
