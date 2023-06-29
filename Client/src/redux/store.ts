import { configureStore } from '@reduxjs/toolkit';
import { rootReducer as reducer } from './reducers/reducers';

export const store = configureStore({
    reducer,
    devTools: true
});

export const storeAppDispatch = store.dispatch;

