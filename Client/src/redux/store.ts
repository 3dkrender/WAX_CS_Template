import {configureStore} from '@reduxjs/toolkit';
import { rootReducer as reducer } from './reducers/reducers';

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore<RootState>({
    reducer,
    devTools: import.meta.env.REDUX_DEVTOOLS || false,
});

export const storeAppDispatch: AppDispatch = store.dispatch;
export default store;