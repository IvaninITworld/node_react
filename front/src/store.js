import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import userSlice from './services/userSlice'
import socketSlice from './services/socketSlice'

const reducers = combineReducers({
  user: userSlice.reducer,
  socket: socketSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'socket'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
})

export default store
