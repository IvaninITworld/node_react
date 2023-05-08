import React from 'react'

import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message'
import './index.scss'

const Messages = ({ messages, nick }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={messages[i].newMessage} nick={nick} />
      </div>
    ))}
  </ScrollToBottom>
)

export default Messages
