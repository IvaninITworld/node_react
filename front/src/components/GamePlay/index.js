import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

import Messages from '../Messages'
import Input from '../Input'
import UserContainer from '../UserContainer'

import './index.scss'

const ENDPOINT = process.env.REACT_APP_API_DOMAIN

let socket

const GamePlay = () => {
  const location = useLocation()

  const { userData, isLoggedIn } = useSelector((state) => {
    return state.user.value
  })

  const [roomName, setRoomName] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const { roomName } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setRoomName(roomName)

    socket.emit('join', { userData, roomName }, (error) => {
      console.log('join try')
      if (error) {
        alert(error)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [ENDPOINT, location.roomName])

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('message 안쪽 콘솔 : ', message)
      setMessages((messages) => [...messages, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className="container gameplay-page">
      <div className="text-zone">
        <div className="Message">
          <Messages messages={messages} nick={userData.nick} />
        </div>

        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <UserContainer users={users} roomName={roomName} />
    </div>
  )
}

export default GamePlay
