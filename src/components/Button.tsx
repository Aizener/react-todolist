import React from 'react'
const { default: style } = require('../assets/scss/button.module.scss')

const Button: React.FC<{
  children: any,
  active: boolean,
  onClick: () => void,
}> = (props) => {
  return (
    <button
      className={`${style.button} ${props.active && style.active}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
