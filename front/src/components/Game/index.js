import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import AnimatedLetters from '../AnimatedLetters'
import { logout } from '../../services/userSlice'
import Loader from 'react-loaders'
import { useRef } from 'react'
import Modal from './Modal/createRoomModal'
import './index.scss'

const Game = () => {
  // const [rooms, setRooms] = useState([])
  const [roomName, setRoomName] = useState([])
  const [roomPassword, setRoomPassword] = useState([])
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const [letterClass, setLetterClass] = useState('text-animate')
  const [modalOpen, setModalOpen] = useState(false)
  const [roomNameValid, setRoomNameValid] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const roomCreate = useRef()
  const dispatch = useDispatch()

  const { userData, isLoggedIn } = useSelector((state) => {
    return state.user.value
  })

  useEffect(() => {
    if (roomNameValid) {
      setButtonDisabled(false)
      return
    }
    setButtonDisabled(true)
  }, [roomNameValid])

  const handleRoomName = (e) => {
    setRoomName(e.target.value)
    // console.log('roomName: ', roomName)
    if (roomName.length > 0) {
      setRoomNameValid(true)
    } else {
      setRoomNameValid(false)
    }
  }
  const handleRoomPassword = (e) => {
    setRoomPassword(e.target.value)
    // console.log('roomPassword: ', roomPassword)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setRoomName('')
    setRoomNameValid(false)
  }

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_DOMAIN)
    setSocket(newSocket)

    newSocket.on('messages', (messages) => {
      setMessages(messages || [])
    })

    const interval = setInterval(() => {
      // 방 목록을 받아와 state 업데이트
      // newSocket.on('rooms', (rooms) => {
      //   setRooms(rooms || [])
      // })

      // 채팅 내용을 받아와 state 업데이트
      newSocket.emit('get_messages')
    }, 2000) // 10초마다 요청을 보냄

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      clearInterval(interval)
      // newSocket.off('messages')
      newSocket.close()
    }
  }, [])

  // 로그아웃
  const handleLogout = () => {
    setRoomName('')
    setRoomNameValid(false)
    dispatch(logout())
  }

  const linkToLogin = () => {
    window.location.href = '/auth/login'
  }

  // const createRoom = () => {
  //   socket.emit('createRoom', { name: 'test' })
  // }

  const createRoom = (e) => {
    e.preventDefault()
    console.log('여기', roomName, roomPassword)
    socket.emit('create_room', {
      roomName: roomName,
      roomPassword: roomPassword,
    })
    setRoomName('')
    setRoomNameValid(false)
    setModalOpen(false)
  }

  return (
    <>
      <div className="container game-page">
        <div className="user-info">
          {isLoggedIn ? (
            <div>
              <p>{userData.nick}님 안녕하세요!</p>
              <button className="flat-button2" onClick={handleLogout}>
                Logout
              </button>
              <button className="flat-button2" onClick={openModal}>
                create room
              </button>
              <Modal
                open={modalOpen}
                close={closeModal}
                header="Create a Game"
                createRoom={createRoom}
              >
                {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. */}
                Room info
                <br />
                <form ref={roomCreate} onSubmit={createRoom}>
                  <ul>
                    <li className="half">
                      <input
                        placeholder="Room Name"
                        type="text"
                        name="roomName"
                        value={roomName}
                        required
                        onChange={handleRoomName}
                      />
                    </li>
                    <li className="half">
                      <input
                        placeholder="Room Password"
                        type="password"
                        name="roomPassword"
                        value={roomPassword}
                        onChange={handleRoomPassword}
                      />
                    </li>
                    <div>
                      <input
                        type="submit"
                        className="flat-button"
                        value="Create"
                        disabled={buttonDisabled}
                      />
                    </div>
                  </ul>
                </form>
              </Modal>
            </div>
          ) : (
            <div>
              <p>로그인이 필요합니다.</p>
              <button className="flat-button2" onClick={linkToLogin}>
                Go to Login
              </button>
            </div>
          )}
        </div>
        <div className="text-zone">
          <div className="gameRoomList">
            <div className="rooms">
              <h1>
                <AnimatedLetters
                  letterClass={letterClass}
                  strArray={['R', 'o', 'o', 'm']}
                  idx={15}
                />
              </h1>
              {/* <ul>
              {rooms.map((room) => (
                <li key={room.id}>{room.name}</li>
              ))}
            </ul> */}
            </div>
          </div>
        </div>
        <div>
          <div className="chat-info">
            <div className="messages">
              <h1>
                <AnimatedLetters
                  letterClass={letterClass}
                  strArray={['M', 'e', 's', 's', 'a', 'g', 'e']}
                  idx={15}
                />
              </h1>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Game
