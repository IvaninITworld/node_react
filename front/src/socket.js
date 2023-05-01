import React from 'react'
import io from 'socket.io-client'

export const socket = io(`${process.env.REACT_APP_API_DOMAIN}`)
export const SocketContext = React.createContext()
