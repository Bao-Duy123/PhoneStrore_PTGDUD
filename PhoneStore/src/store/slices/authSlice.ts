import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, RegisterData, AuthResponse } from '@/types';

const AUTH_STORAGE_KEY = 'phonestore_auth';

function getAuthFromStorage(): { user: User | null; token: string | null } {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // Ignore
  }
  return { user: null, token: null };
}

function saveAuthToStorage(auth: { user: User | null; token: string | null }) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch {
    // Ignore
  }
}

const storedAuth = getAuthFromStorage();

const initialState: AuthState = {
  user: storedAuth.user,
  token: storedAuth.token,
  isAuthenticated: !!storedAuth.user,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      saveAuthToStorage({ user: action.payload.user, token: action.payload.token });
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem(AUTH_STORAGE_KEY);
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthToStorage({ user: state.user, token: state.token });
      }
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
