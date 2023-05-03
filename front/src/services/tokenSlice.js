// import { createSlice } from '@reduxjs/toolkit'

// export const TOKEN_TIME_OUT = 600 * 1000

// const initialState = {
//   value: {
//     authenticated: false,
//     accessToken: null,
//     expireTime: null,
//   },
// }

// const asyncUpFetchToken = createAsyncThunk(
//   'POST/auth/token',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/verifyUser`,
//         credentials
//       )
//       console.log('토큰 이후 response : ', response.data)
//       localStorage.setItem('token', response.data.token)
//       return response.data
//     } catch (error) {
//       console.error(error)
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   }
// )

// export const tokenSlice = createSlice({
//   name: 'authToken',
//   initialState,
//   reducers: {
//     SET_TOKEN: (state, action) => {
//       state.authenticated = true
//       state.accessToken = action.payload
//       state.expireTime = new Date().getTime() + TOKEN_TIME_OUT
//     },
//     DELETE_TOKEN: (state) => {
//       state.authenticated = false
//       state.accessToken = null
//       state.expireTime = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(asyncUpFetchToken.pending, (state, action) => {
//       state.status = 'Loading'
//     })
//     builder.addCase(asyncUpFetchToken.fulfilled, (state, action) => {
//       state.authenticated = true
//       state.accessToken = action.payload
//       state.expireTime = new Date().getTime() + TOKEN_TIME_OUT
//       state.status = 'complete'
//     })
//     builder.addCase(asyncUpFetchToken.rejected, (state, action) => {
//       state.status = 'fail'
//     })
//   },
// })

// export default tokenSlice.reducer
// export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions
