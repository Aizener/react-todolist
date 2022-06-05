import React from 'react'
const { default: style } = require('../assets/scss/button.module.scss')

const Button: React.FC<{
  width?: string,
  children: any,
  type?: string,
  active?: boolean,
  onClick: () => void,
}> = (props) => {
  const getTypeStyle = (type = 'default') => {
    const style: {
      [props: string]: string
    } = {}
    switch(props.type) {
      case 'default':
        style.color = '#333'
        style.backgroundColor = '#fff'
        break
      case 'primary':
        style.color = '#fff'
        style.backgroundColor = '#007fff'
        style.border = 'none'
    }
    style.width = props.width || '100px'
    return style
  }
  return (
    <button
      style={getTypeStyle(props.type)}
      className={`${style.button} ${props.active && style.active}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
