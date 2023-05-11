import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { asyncUpFetchRegister } from '../../services/userSlice'
import './index.scss'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nick, setNick] = useState('')
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
  const handleNick = (e) => {
    setNick(e.target.value)
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

  const register = (e) => {
    e.preventDefault()
    console.log('send registeration request')

    let email = e.target.email.value
    let nick = e.target.nick.value
    let password = e.target.password.value

    console.log(email, nick, password)
    try {
      dispatch(asyncUpFetchRegister({ email, nick, password }))
      window.location.href = '/auth/login'
    } catch (error) {
      console.log('error in register.js : ', error)
      alert(`Failed to register, please try again. reason : ${error.message}`)
    }
  }

  const linkToLogin = () => {
    window.location.href = '/auth/login'
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['R', 'e', 'g', 'i', 's', 't', 'e', 'r']}
              idx={15}
            />
          </h1>
          <p>Create a USER</p>

          <div className="login-form">
            <form ref={form} onSubmit={register}>
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
                    placeholder="Nickname"
                    type="text"
                    name="nick"
                    required
                    value={nick}
                    onChange={handleNick}
                  />
                </li>
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
                    value="Register"
                    disabled={buttonDisabled}
                  />
                </div>
              </ul>
            </form>
            {/* 아래 register 버튼은 라우팅 기능이 있는 버튼으로 */}
            <button className="flat-button2" onClick={linkToLogin}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Register
