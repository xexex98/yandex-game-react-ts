import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authSlice } from './modules/auth/authSlice';
import { gameStateSlice } from './modules/gameState/gameStateSlice';

const rootReducer = combineSlices(authSlice, gameStateSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
