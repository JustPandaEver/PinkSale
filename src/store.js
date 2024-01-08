import { configureStore,combineReducers } from '@reduxjs/toolkit';
import pinksaleSlice from './features/pinksale/pinksaleSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const reducer=combineReducers({
    pinksale: pinksaleSlice,
})
  const persistedReducer = persistReducer(persistConfig, reducer)

export default configureStore({
    reducer: persistedReducer
});
