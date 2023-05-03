// import { Cookies } from 'react-cookie'

// const cookies = new Cookies()

// // refresh token 을 cookie 에 저장
// export const setRefreshToken = (refreshToken) => {
//   const today = new Date()
//   const expireDate = today.setDate(today.getDate() + 7)

//   return cookies.set('refresh_token', refreshToken, {
//     sameSite: 'strict',
//     path: '/',
//     expires: new Date(expireDate),
//   })
// }

// // cookie 에서 refresh token 을 가져옴
// export const getCookieToken = () => {
//   return cookies.get('refresh_token')
// }

// // cookie 에서 refresh token 을 제거
// export const removeCookieToken = () => {
//   return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' })
// }
