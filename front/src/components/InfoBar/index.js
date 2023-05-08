import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../services/userSlice'
import { useRef } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Modal from './Modal/createRoomModal'
import './index.scss'

const InfoBar = () => {
  const [roomName, setRoomName] = useState('')
  //   const [roomPassword, setRoomPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [roomNameValid, setRoomNameValid] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [letterClass, setLetterClass] = useState('text-animate')

  const roomCreate = useRef()
  const dispatch = useDispatch()

  const { userData, isLoggedIn, userRoomName } = useSelector((state) => {
    return state.user.value
  })

  const linkToLogin = () => {
    window.location.href = '/auth/login'
  }

  // 로그아웃
  const handleLogout = () => {
    dispatch(logout())
  }

  const openModal = () => {
    setModalOpen(true)
    setButtonDisabled(true)
    setRoomNameValid(false)
  }

  const closeModal = () => {
    setModalOpen(false)
    setRoomName('')
    setRoomNameValid(false)
  }

  const createRoom = (e) => {
    e.preventDefault()

    if (roomName.length > 0 && roomName !== 'public') {
      window.location.href = `/gameplay?roomName=${roomName}`
    }
    setModalOpen(false)
  }

  const handleRoomName = (e) => {
    setRoomName(e.target.value)
    if (roomName.length > 0) {
      setRoomNameValid(true)
      setButtonDisabled(false)
    } else {
      setRoomNameValid(false)
    }
  }

  //   const handleRoomPassword = (e) => {
  //     setRoomPassword(e.target.value)
  //   }

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="infoBar">
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['W', 'e', 'l', 'c', 'o', 'm', 'e']}
                idx={15}
              />
            </h1>
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
              // createRoom={createRoom}
            >
              {/* Modal.js <main> {props.children} </main>에 내용이 입력된다.
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
                  <div>
                    <input
                      type="submit"
                      className="flat-button"
                      value="Create"
                      disabled={buttonDisabled}
                    />
                  </div>
                </ul>
              </form> */}
            </Modal>
          </div>
        </>
      ) : (
        <div className="infoBar">
          <p>로그인이 필요합니다.</p>
          <button className="flat-button2" onClick={linkToLogin}>
            Go to Login
          </button>
        </div>
      )}
    </>
  )
}

export default InfoBar
