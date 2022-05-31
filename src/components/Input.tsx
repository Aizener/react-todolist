import React from 'react'
const { default: style } = require('../assets/scss/input.module.scss')

const Input: React.FC<{
  value: string,
  placeholder?: string,
  maxlength?: number,
  onChange: (value: string) => void
}> = (props) => {
  return (
    <input
      value={props.value}
      className={style.input}
      maxLength={props.maxlength}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    ></input>
  )
}

export default Input
