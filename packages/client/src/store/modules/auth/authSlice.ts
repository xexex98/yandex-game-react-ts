import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL, APPLICATION_JSON } from '../../../consts';
import { FormSignIn } from '../../../pages/login/lazy';
import { FormSignUp } from '../../../pages/registration/lazy';

type AuthState = {
  isLoggedIn: boolean;
  user: AuthUserResponse | null;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
};

export type AuthUserResponse = {
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
        return response.json().then((text) => {
          return rejectWithValue(text.reason);
        });
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
        return response.json().then((text) => {
          return rejectWithValue(text.reason);
        });
      }
      await dispatch(getCurrentUser());
    } catch (error) {
      return rejectWithValue((error as Error).message || error);
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
        return response.json().then((text) => {
          return rejectWithValue(text.reason);
        });
      }
      await dispatch(getCurrentUser());
    } catch (error) {
      return rejectWithValue((error as Error).message || error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: APPLICATION_JSON,
        credentials: 'include',
      });

      if (!response.ok) {
        return response.json().then((text) => {
          return rejectWithValue(text.reason);
        });
      }
    } catch (error) {
      return rejectWithValue((error as Error).message || error);
    }
  }
);

const initialState: AuthState = {
  status: 'idle',
  user: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.status = 'success';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
        state.isLoggedIn = false;
        state.user = null;
        state.status = 'failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.status = 'success';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
        state.isLoggedIn = false;
        state.user = null;
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
