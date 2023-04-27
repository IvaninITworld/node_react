// import axios from '../../utils/axios'
// import authReducer from '../reducers/authReducer'

// export const login = (credentials) => async (dispatch) => {
//   console.log('authActions.js login() : credentials - ', credentials)
//   try {
//     const response = await axios.post('/auth/login', credentials)
//     console.log('authActions.js login() : response - ', response)
//     const { token, user } = response.data

//     // 토큰을 로컬 스토리지에 저장합니다.
//     localStorage.setItem('token', token)

//     // Redux store에 토큰과 유저 정보를 저장합니다.
//     dispatch({ type: 'LOGIN', payload: { token, user } })
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const logout = () => {
//   // 로컬 스토리지에서 토큰을 제거합니다.
//   localStorage.removeItem('token')

//   return {
//     type: 'LOGOUT',
//   }
// }

// export const setToken = (token) => ({
//   type: 'SET_TOKEN',
//   payload: token,
// })

// export const removeToken = () => ({
//   type: 'REMOVE_TOKEN',
// })
