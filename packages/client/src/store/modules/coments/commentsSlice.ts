import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { EmojiType, EmojiTypeArray } from '../reactions/reactionsSlice';

export type CommentType = {
  id: number;
  title: string;
  name: string;
  rating?: number;
  content: string;
  date: Date;
  avatar?: string;
  reactions?: EmojiTypeArray;
};

export type CommentsType = Array<CommentType>;

export type CommentsState = {
  comments: CommentsType;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
};
const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

export type AddReactionType = {
  userId?: number;
  commentId?: number;
  reaction: EmojiType;
};

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (_, { rejectWithValue }) => {
    try {
      // Здесь подключим API получения списка комментариев, когда оно будет готово

      // const response = await fetch(`${API_URL}/comments`, {
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

      return arrayComments;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// export const addReaction = createAsyncThunk(
//     'comments/reactions',
//     async (payload: AddReactionType, { rejectWithValue }) => {
//         // Здесь подключим API добавления реакции, когда будет готово

//         try {
//
//         } catch (error) {
//             return rejectWithValue((error as Error).message);
//         }
//     }
// )

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { commentId, reaction, userId } = action.payload as AddReactionType;

      const comment = state.comments.filter((c) => c.id === commentId)[0];

      const existReaction = comment.reactions?.filter(
        (r) => r.id === reaction.id
      ).length;

      if (!existReaction) {
        comment.reactions?.push({ ...reaction });
      }
      comment?.reactions?.forEach((r) => {
        if (r.id === reaction.id) {
          r.count ? r.count++ : (r.count = 1);
          if (userId) {
            r.reacted ? r.reacted.push(userId) : (r.reacted = [userId]);
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = 'success';
      })
      .addCase(getComments.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const { addReaction } = commentsSlice.actions;

export default commentsSlice.reducer;

const date = new Date();

const arrayComments = [
  {
    id: 1,
    title: 'Title 1',
    name: 'User 1',
    rating: 99,
    content: 'Content 1',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [
      {
        id: 1,
        path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        count: 95,
        reacted: [1748],
      },
      {
        id: 2,
        path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        count: 4,
      },
      {
        id: 3,
        path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        count: 11,
      },
      {
        id: 4,
        path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        count: 24,
      },
      {
        id: 5,
        path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        count: 0,
      },
    ],
  },
  {
    id: 2,
    title: 'Title 2',
    name: 'User 2',
    rating: 9147,
    content: 'Content 2',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [
      {
        id: 1,
        path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        count: 1,
      },
      {
        id: 2,
        path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        count: 1,
      },
      {
        id: 3,
        path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        count: 1,
      },
      {
        id: 4,
        path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        count: 2,
      },
      {
        id: 5,
        path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        count: 22,
      },
    ],
  },
  {
    id: 3,
    title: 'Title 3',
    name: 'User 1',
    rating: 99,
    content: 'Content 3',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [
      {
        id: 1,
        path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        count: 950,
      },
      {
        id: 2,
        path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        count: 40,
      },
      {
        id: 3,
        path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        count: 110,
      },
      {
        id: 4,
        path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        count: 0,
      },
      {
        id: 5,
        path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        count: 0,
      },
    ],
  },
  {
    id: 4,
    title: 'Title 4',
    name: 'User 3',
    rating: 9,
    content: 'Content 4',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [
      {
        id: 1,
        path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        count: 1,
      },
      {
        id: 2,
        path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        count: 4,
      },
      {
        id: 3,
        path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        count: 1,
      },
      {
        id: 4,
        path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        count: 0,
      },
      {
        id: 5,
        path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        count: 0,
      },
    ],
  },
  {
    id: 5,
    title: 'Title 5',
    name: 'User 2',
    rating: 7744,
    content: 'Content 5',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [],
  },
  {
    id: 6,
    title: 'Title 6',
    name: 'User 6',
    rating: 9999,
    content: 'Content 6',
    date,
    avatar:
      'https://sun9-79.userapi.com/impg/F52g19U5UFR60GgIn6HPETlKkVXQULnHHP_GVQ/K6KU52T-HLI.jpg?size=1280x1280&quality=95&sign=6f8e612a227859091466027b887e45bb&c_uniq_tag=GUiBC7SZ3jnFSWqQx8UZt3NfU4Fx7c9LlC4o5bYf85k&type=album',
    reactions: [
      {
        id: 1,
        path: 'https://img.icons8.com/emoji/48/heart-suit.png',
        count: 6,
      },
      {
        id: 2,
        path: 'https://img.icons8.com/emoji/48/thumbs-up.png',
        count: 11,
      },
      {
        id: 3,
        path: 'https://img.icons8.com/emoji/48/thumbs-down-emoji.png',
        count: 0,
      },
      {
        id: 4,
        path: 'https://img.icons8.com/emoji/48/loudly-crying-face.png',
        count: 0,
      },
      {
        id: 5,
        path: 'https://img.icons8.com/emoji/48/face-with-tears-of-joy.png',
        count: 0,
      },
    ],
  },
];
