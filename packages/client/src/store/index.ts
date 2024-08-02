import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { authSlice } from './modules/auth/authSlice';
import { gameStateSlice } from './modules/gameState/gameStateSlice';
import { leaderboardSlice } from './modules/leaderboard/leaderboardSlice';

const rootReducer = combineSlices(authSlice, gameStateSlice, leaderboardSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
