import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API_URL, APPLICATION_JSON } from '../../../consts';
import { FormSignIn } from '../../../pages/login';
import { FormSignUp } from '../../../pages/registration/lazy';

type AuthState = {
  isLoggedIn: boolean;
  user: AuthUserResponse | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
};

type AuthUserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export const getCurrentUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        credentials: 'include',
        headers: APPLICATION_JSON,
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user: FormSignIn, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: APPLICATION_JSON,
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      await dispatch(getCurrentUser());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (user: FormSignUp, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: APPLICATION_JSON,
        body: JSON.stringify(user),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Can not register');
      }
      await dispatch(getCurrentUser());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: AuthState = {
  status: 'idle',
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = 'success';
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.status = 'failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = 'success';
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
        state.status = 'failed';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<AuthUserResponse>) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.status = 'success';
        }
      )
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
