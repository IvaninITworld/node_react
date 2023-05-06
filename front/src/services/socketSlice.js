import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    rooms: [],
    messages: [],
  },
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  // 동기 처리
  reducers: {
    rooms: (state, action) => {
      state.value.messages = action.payload.messages
    },
    messages: (state, action) => {
      state.value.rooms = action.payload.rooms
    },
  },
})

export default socketSlice
export const { rooms, messages } = socketSlice.actions
