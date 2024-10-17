// /store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or another storage mechanism
import userReducer from './features/user/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
