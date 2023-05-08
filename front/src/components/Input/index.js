import React from 'react'

import './index.scss'

const Input = ({ setMessage, sendMessage, message }) => (
  <>
    <div className="messageInput">
      <form className="form">
        <input
          // className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyDown={(event) =>
            event.key === 'Enter' && event.nativeEvent.isComposing === false
              ? sendMessage(event)
              : null
          }
        />
        <button className="flat-button" onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </form>
    </div>
  </>
)

export default Input
