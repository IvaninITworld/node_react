import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: {
    rooms: [],
    messages: [],
  },
}

// const asyncUpFetchChat = createAsyncThunk(
//   'GET/auth/login',
//   async (credentials, thunkAPI) => {
//     console.log('credentials : ', credentials)

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/gmae/chat`,
//         credentials
//       )
//       console.log('Access to game page response : ', response.data)

//       return response.data
//     } catch (error) {
//       console.error(error)
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   }
// )

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

  //   // 비동기 처리
  //   extraReducers: (builder) => {
  //     builder.addCase(asyncUpFetchChat.pending, (state, action) => {
  //       state.status = 'Loading'
  //     })
  //     builder.addCase(asyncUpFetchChat.fulfilled, (state, action) => {
  //       console.log('동작하나 ?')
  //       state.value.isLoggedIn = true
  //       state.value.userData = action.payload.user
  //       state.value.token = action.payload.token
  //       state.status = 'complete'
  //     })
  //     builder.addCase(asyncUpFetchChat.rejected, (state, action) => {
  //       state.status = 'fail'
  //     })
  //   },
})

export default socketSlice
export const { rooms, messages } = socketSlice.actions
