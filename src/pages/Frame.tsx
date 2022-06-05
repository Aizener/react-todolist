import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
const { default: style } = require('../assets/scss/frame.module.scss')

const Frame: React.FC<{}> = () => {
  const [active, setActive] = useState<number>(0)
  const navigator = useNavigate()
  const location = useLocation()
  useEffect(() => {
    location.pathname === '/' && (navigator('/todolist'))
  })
  return (
    <div className={style.frame}>
      <div className={style.frameTop}>
        <Button active={active === 0} onClick={() => {
          setActive(0)
          navigator('/todolist')
        }}>代办</Button>
        <Button active={active === 1} onClick={() => {
          setActive(1)
          navigator('/schedule')
        }}>日程</Button>
      </div>
      <div className={style.frameContent}>
        <Outlet />
      </div>
    </div>
  )
}

export default Frame
