import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';

export type EmojiType = {
  id?: number;
  path: string;
  count?: number; // Количество реакций
  reacted?: number[]; // Кем поставлена реакция
};

export type EmojiTypeArray = Array<EmojiType>;
export type ReactionsState = {
  emojiList: EmojiTypeArray;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
};
const initialState: ReactionsState = {
  emojiList: [],
  status: 'idle',
  error: null,
};

export const getEmojiList = createAsyncThunk(
  'reactions',
  async (_, { rejectWithValue }) => {
    try {
      // Здесь подключим API получения списка доступных эмодзи, когда оно будет готово

      // const response = await fetch(`${API_URL}/reactions`, {
      //     credentials: 'include',
      //     headers: APPLICATION_JSON,
      // });

      // if (!response.ok) {
      //     return response.json().then((text) => {
      //         return rejectWithValue(text.reason);
      //     });
      // }

      // const data = await response.json();

      // return data;

      return Promise.resolve([
        {
          id: 1,
          path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        },
        {
          id: 2,
          path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        },
        {
          id: 3,
          path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        },
        {
          id: 4,
          path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        },
        {
          id: 5,
          path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        },
      ]);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmojiList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmojiList.fulfilled, (state, action) => {
        state.emojiList = action.payload;
        state.status = 'success';
      })
      .addCase(getEmojiList.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export const selectEmoji = (state: RootState) => state.reaction.emojiList;

export default reactionSlice.reducer;
