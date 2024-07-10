import { createSlice } from '@reduxjs/toolkit';

export interface GameState {
  status: 'started' | 'new' | 'over';
}

const initialState: GameState = {
  status: 'new',
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = 'started';
    },
    stopGame: (state) => {
      state.status = 'over';
    },
    newGame: (state) => {
      state.status = 'new';
    },
  },
});

export const { startGame, stopGame, newGame } = gameStateSlice.actions;

export default gameStateSlice.reducer;
