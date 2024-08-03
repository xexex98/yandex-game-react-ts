import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllLeaderboardTeam, RatingType } from '../../../api/leaderboard';
import { searchUsers } from '../../../api/user';
import { AppDispatch, RootState } from '../..';

type Rating = RatingType;

type LeaderboardType = {
  leaderboard: Array<Rating>;
  error: string | null;
  status: 'loading' | 'success' | 'failed';
};

export const getAllLeaderboard = createAsyncThunk<
  Array<Rating>,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>(`/leaderboard/all`, async (_, { getState, rejectWithValue }) => {
  try {
    const data = (await getAllLeaderboardTeam()).map((el) => el.data);

    data.sort((el1, el2) => el2.rating - el1.rating);

    const state = getState();

    const user = state.auth.user;

    const usersTop3 = await Promise.all(
      data.map((el) =>
        el.login === user?.login ? [user] : searchUsers(el.login)
      )
    );

    return data.map((el, index) => {
      const user = usersTop3[index].find((user) => user.login === el.login);
      const avatar = user?.avatar || null;

      return { ...el, avatar };
    });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const initialState: LeaderboardType = {
  leaderboard: [],
  status: 'success',
  error: null,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaderboard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.status = 'success';
      })
      .addCase(getAllLeaderboard.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});
