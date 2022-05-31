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
      style={{
        width: props.width,
        height: props.height
      }}
      className={style.text}
    ></textarea>
  )
}

export default Text
