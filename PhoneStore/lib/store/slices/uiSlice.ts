import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, Toast } from '@/types';

const initialState: UIState = {
  isSidebarOpen: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Math.random().toString(36).substring(2, 9);
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  addToast,
  removeToast,
  clearToasts,
} = uiSlice.actions;

export default uiSlice.reducer;
