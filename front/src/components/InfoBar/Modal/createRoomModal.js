import React, { useState } from 'react'
import './createRoomModal.scss'
import { useRef } from 'react'

const Modal = (props) => {
  const { open, close, header } = props
  const [roomName, setRoomName] = useState('')
  const [roomNameValid, setRoomNameValid] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const roomCreate = useRef()

  const openModal = () => {
    setModalOpen(true)
    setRoomNameValid(false)
  }

  const closeModal = () => {
    setModalOpen(false)
    setRoomName('')
  }

  const handleRoomName = (e) => {
    setRoomName(e.target.value)
    if (roomName.length > 0) {
      setRoomNameValid(true)
    } else {
      setRoomNameValid(false)
    }
  }

  const createRoom = (e) => {
    e.preventDefault()

    if (roomName.length > 0 && roomName !== 'public') {
      window.location.href = `/gameplay?roomName=${roomName}`
    }
    setModalOpen(false)
  }

  return (
    <>
      {/* 모달이 열릴때 openModal 클래스가 생성된다. */}
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>

            <main>
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
                  <div>
                    <input
                      type="submit"
                      className="flat-button"
                      value="Create"
                      // disabled={buttonDisabled}
                    />
                  </div>
                </ul>
              </form>
            </main>
          </section>
        ) : null}
      </div>
      {/* <Loader type="pacman" /> */}
    </>
  )
}

export default Modal
