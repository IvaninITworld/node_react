import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom'
import { asyncUpFetchLogin } from '../../features/userSlice'
import './index.scss'

const Game = () => {
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  const dispatch = useDispatch()
  const { userData, isLoggedIn } = useSelector((state) => {
    return state.user.value
  })

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (isLoggedIn && token) {
      // 사용자 정보를 서버에서 가져와 store 에 저장합니다.
      dispatch(asyncUpFetchLogin({ token }))
    }

    console.log('token value is : ', token)
    console.log('userData value is : ', userData)
    console.log('isLoggedIn value is : ', isLoggedIn)
    console.log('socket value is : ', socket)

    const newSocket = io(process.env.REACT_APP_API_DOMAIN, {
      query: { token },
    })
    setSocket(newSocket)

    // 방 목록을 받아와 state 업데이트
    newSocket.on('rooms', (rooms) => {
      setRooms(rooms || [])
    })

    // 채팅 내용을 받아와 state 업데이트
    newSocket.on('messages', (messages) => {
      setMessages(messages || [])
    })

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      newSocket.close()
    }
  }, [dispatch, isLoggedIn, userData, socket])

  return (
    <div className="game-container">
      <div>
        {isLoggedIn ? (
          <div>
            <p>{userData.nick}님 안녕하세요!</p>
            {/* <button onClick={handleLogout}>로그아웃</button> */}
          </div>
        ) : (
          <div>
            <p>로그인이 필요합니다.</p>
            <Link to="/auth/login" className="flat-button2">
              go to login
            </Link>
            {/* <button onClick={() => handleLogin({ username, password })}>
              로그인
            </button>
            <button onClick={() => handleSignup({ username, password })}>
              회원가입
            </button> */}
          </div>
        )}
      </div>
      <div className="primary">
        <div className="rooms">
          <h2>Rooms</h2>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="secondary">
        <div className="messages">
          <h2>Messages</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Game
