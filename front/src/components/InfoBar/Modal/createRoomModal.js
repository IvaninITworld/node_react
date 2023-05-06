import React from 'react'
import './createRoomModal.scss'

const Modal = (props) => {
  const { open, close, header, createRoom } = props

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

            <main>{props.children}</main>
          </section>
        ) : null}
      </div>
      {/* <Loader type="pacman" /> */}
    </>
  )
}

export default Modal
