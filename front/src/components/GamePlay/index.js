import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { io } from 'socket.io-client'

const ENDPOINT = process.env.REACT_APP_API_DOMAIN

let socket

const GamePlay = ({ location }) => {
  const { userData, isLoggedIn, userRoomName } = useSelector((state) => {
    return state.user.value
  })
  const [roomName, setRoomName] = useState('')
  const [roomPassword, setRoomPassword] = useState('')

  useEffect(() => {
    const { roomName } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setRoomName(roomName)
    setRoomPassword(roomPassword)

    socket.emit('join', { userData, roomName }, (error) => {
      if (error) {
        alert(error)
      }
    })
  }, [ENDPOINT])

  return (
    <>
      <h1>Game Play Area</h1>
    </>
  )
}
