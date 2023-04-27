import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoggedIn: false,
  userData: null,
  token: null,
}

const asyncUpFetchLogin = createAsyncThunk(
  'POST/auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        credentials
      )
      const { token, user } = response.data
      localStorage.setItem('token', token)
      return { token, user }
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.user
      state.token = action.payload.token
    },
  },

  extraReducers: (builder) => {
    builder.addCase(asyncUpFetchLogin.pending, (state, action) => {
      state.status = 'Loading'
    })
    builder.addCase(asyncUpFetchLogin.fulfilled, (state, action) => {
      state.value = action.payload
      state.status = 'complete'
    })
    builder.addCase(asyncUpFetchLogin.rejected, (state, action) => {
      state.status = 'fail'
    })
  },
})

export const { login } = loginSlice.actions
export default loginSlice
export { asyncUpFetchLogin }
