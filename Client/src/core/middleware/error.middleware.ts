import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('Action failed:', action.error);
    // Here you could dispatch actions to show error messages
    // or update error state in your store
  }

  return next(action);
}; 