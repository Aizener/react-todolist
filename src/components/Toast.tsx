import React, { useEffect } from 'react'
import { useRootContext } from '../App'
import style from '../assets/scss/toast.module.scss'
import { Transition } from 'react-transition-group'

let timer: NodeJS.Timeout | undefined
const defaultStyle = {
  transition: `all 300ms ease-in-out`,
  opacity: 0,
}

const transitionStyles: any = {
  entering: { opacity: 1, transform: `translate(-50%, 0%)` },
  entered:  { opacity: 1, transform: `translate(-50%, 0%)` },
  exiting:  { opacity: 0, transform: `translate(-50%, -50%)` },
  exited:  { opacity: 0, transform: `translate(-50%, -50%)` },
}

const Toast: React.FC<{
  children: string
}> = (props) => {
  const { state, setState }: any = useRootContext()
  useEffect(() => {
    if (state.showToast && !timer) {
      timer = setTimeout(() => {
        setState({
          ...state,
          showToast: false
        })
        clearTimeout(timer)
        timer = undefined
      }, 3e3)
    }
  }, [state])
  return (
    <Transition in={state.showToast} timeout={300}>
      {
        _state => (
          <div
            className={style.toast}
            style={{
              // display: state.showToast ? 'flex' : 'none',
              ...defaultStyle,
              ...transitionStyles[_state]
            }}
          >{props.children}</div>
        )
      }
    </Transition>
  )
}

export default Toast
