import { configureStore } from '@reduxjs/toolkit';
import { loggerMiddleware } from '../middleware/logger.middleware';
import { errorMiddleware } from '../middleware/error.middleware';
import authReducer from '../../features/auth/store/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 