import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { counterReducer } from '../../features/counter/CounterSlice';
export * from '../../features/counter/CounterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
