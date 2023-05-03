import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { Link } from 'react-router-dom'
// import axios from '../../utils/axios'
import { useDispatch } from 'react-redux'
import { asyncUpFetchLogin } from '../../services/userSlice'
// import { login } from '../../store/actions/authActions'
import './index.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (emailValid && passwordValid) {
      setButtonDisabled(false)
      return
    }
    setButtonDisabled(true)
  }, [emailValid, passwordValid])

  const handleEmail = (e) => {
    setEmail(e.target.value)
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (regex.test(e.target.value)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
    if (regex.test(e.target.value)) {
      setPasswordValid(true)
    } else {
      setPasswordValid(false)
    }
  }

  const loginHandler = (e) => {
    e.preventDefault()

    try {
      console.log('button clikced')
      dispatch(asyncUpFetchLogin({ email, password }))
      window.location.href = '/game'
    } catch (error) {
      alert(`Failed to log in, please try again. reason: ${error.message}`)
    }
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['L', 'o', 'g', 'i', 'n']}
              idx={15}
            />
          </h1>
          <p>Login before joing the game</p>

          <div className="login-form">
            <form ref={form} onSubmit={loginHandler}>
              <ul>
                <li>
                  <input
                    placeholder="email"
                    type="text"
                    name="email"
                    required
                    value={email}
                    onChange={handleEmail}
                  />
                </li>
                <div className="errorMessageWrap">
                  {!emailValid && email.length > 0 && (
                    <div>Wrong email format</div>
                  )}
                </div>
                <li>
                  <input
                    placeholder="password"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={handlePassword}
                  />
                </li>
                <div className="errorMessageWrap">
                  {!passwordValid && password.length > 0 && (
                    <div>Wrong password format</div>
                  )}
                </div>
                <div>
                  <input
                    type="submit"
                    className="flat-button"
                    value="Login"
                    disabled={buttonDisabled}
                  />
                </div>
              </ul>
            </form>
            {/* 아래 register 버튼은 라우팅 기능이 있는 버튼으로 */}
            <Link to="/auth/join" className="flat-button2">
              register
            </Link>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Login
