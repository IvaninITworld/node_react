// import { useEffect, useRef } from 'react'
// import gsap from 'gsap-trial'
// import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
// import LogoS from '../../../assets/images/logo-s.png'
// import './index.scss'

// const Logo = () => {
//   // 로고를 그리기 위한 변수 생성
//   const bgRef = useRef()
//   const outlineLogoRef = useRef()
//   const solidLogoRef = useRef()

//   useEffect(() => {
//     // 경로를 그리기 위해 추가적인 플러그인 추가 "DrawSVGPlugin"
//     gsap.registerPlugin(DrawSVGPlugin)

//     gsap
//       .timeline()
//       .to(bgRef.current, {
//         duration: 1,
//         opacity: 1,
//       })
//       .from(outlineLogoRef.current, {
//         drawSVG: 0,
//         duration: 20,
//       })

//     gsap.fromTo(
//       solidLogoRef.current,
//       {
//         opacity: 0,
//       },
//       {
//         opacity: 1,
//         delay: 4,
//         duration: 4,
//       }
//     )
//   }, [])

//   return (
//     <div className="logo-container" ref={bgRef}>
//       <img
//         className="solid-logo"
//         ref={solidLogoRef}
//         src={LogoS}
//         alt="JavaScript, Developer"
//       />
//     </div>
//   )
// }

// export default Logo
