import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import './index.scss'

const Game = () => {
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_DOMAIN, {
      query: { token },
    })
    setSocket(newSocket)

    newSocket.on('rooms', (rooms) => {
      setRooms(rooms)
    })

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => newSocket.close()
  }, [token])

  return (
    <div className="game-container">
      <div className="rooms">
        <h2>Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      </div>
      <div className="messages">
        <h2>Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Game
