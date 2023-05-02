import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: {
    isLoggedIn: false,
    userData: null,
    token: null,
  },
}

const asyncUpFetchLogin = createAsyncThunk(
  'POST/auth/login',
  async (credentials, thunkAPI) => {
    console.log('credentials : ', credentials)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        credentials
      )
      console.log('로그인 이후 response : ', response.data)
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  // 동기 처리
  reducers: {
    login: (state, action) => {
      console.log('안쪽??')
      state.value.isLoggedIn = true
      state.value.userData = action.payload.user
      state.value.token = action.payload.token
    },
    logout: (state, action) => {
      state.value.isLoggedIn = false
      state.value.userData = null
      state.value.token = null
    },
  },

  // 비동기 처리
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetchLogin.pending, (state, action) => {
      state.status = 'Loading'
    })
    builder.addCase(asyncUpFetchLogin.fulfilled, (state, action) => {
      state.value.isLoggedIn = true
      state.value.userData = action.payload.user
      state.value.token = action.payload.token
      state.status = 'complete'
    })
    builder.addCase(asyncUpFetchLogin.rejected, (state, action) => {
      state.status = 'fail'
    })
  },
})

export default userSlice
export const { login, logout } = userSlice.actions
export { asyncUpFetchLogin }
