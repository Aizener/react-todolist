import React from 'react'
const { default: style } = require('../assets/scss/text.module.scss')

const Text: React.FC<{
  value: string,
  width?: string,
  height?: string,
  placeholder?: string,
  onChange: (value: string) => void,
}> = (props) => {
  return (
    <textarea
      value={props.value}
      style={{
        width: props.width,
        height: props.height
      }}
      className={style.text}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    ></textarea>
  )
}

export default Text
