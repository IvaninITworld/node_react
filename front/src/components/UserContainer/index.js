import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png'
import './index.scss'

const UserContainer = ({ users, roomName }) => (
  <div className="userContainer">
    <div>
      <h1>
        Realtime Chat Application{' '}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>Created with React, Express, Node and Socket.IO</h2>
    </div>
    {users ? (
      <div>
        <div className="activeContainer">
          <h2>Users in {roomName} </h2>
          <h2>
            {users.map((nick, index) => (
              <div key={index} className="activeItem">
                {users[index].nick}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default UserContainer
