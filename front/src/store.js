// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
})

export default store
