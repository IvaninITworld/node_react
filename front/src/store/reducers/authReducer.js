const initialState = {
  isLoggedIn: false,
  userData: null,
  token: localStorage.getItem('token'),
}

const authReducer = (state, action) => {
  console.log('authReducer.js LOGIN : state - ', state)
  console.log('authReducer.js LOGIN : action - ', action)
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        token: null, // 로그아웃 시 토큰을 null로 설정합니다.
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

export default authReducer
