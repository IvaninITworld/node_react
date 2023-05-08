import './index.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faLinkedin,
  faGithub,
  // faYoutube,
  // faSkype,
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  // faSuitcase,
  faBars,
  faClose,
  faGamepad,
  faDirections,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="nav-bar">
      <Link className="logo" to="/" onClick={() => setShowNav(false)}>
        <FontAwesomeIcon icon={faHome} size="3x" color="#4d4d4e" />
      </Link>

      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <div className="linkBox">
            <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
          </div>
        </NavLink>

        <NavLink
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}
        >
          <div className="linkBox">
            <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
          </div>
        </NavLink>

        <NavLink
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}
        >
          <div className="linkBox">
            <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
          </div>
        </NavLink>

        <NavLink
          activeclassname="active"
          className="auth-link"
          to="/auth/login"
          onClick={() => setShowNav(false)}
        >
          <div className="linkBox">
            <FontAwesomeIcon icon={faDirections} color="#4d4d4e" />
          </div>
        </NavLink>

        {/* <NavLink
          activeclassname="active"
          className="game-link"
          to="/game"
          onClick={() => setShowNav(false)}
        >
          <div className="linkBox">
            <FontAwesomeIcon icon={faGamepad} color="#4d4d4e" />
          </div>
        </NavLink> */}

        <FontAwesomeIcon
          onClick={() => {
            setShowNav(false)
          }}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className="close-icon"
        />
      </nav>
      <ul>
        <li>
          <a
            href="https://github.com/IvaninITworld"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon
        onClick={() => {
          setShowNav(true)
        }}
        icon={faBars}
        color="#ffd700"
        size="3x"
        className="hamburger-icon"
      />
    </div>
  )
}

export default Sidebar
