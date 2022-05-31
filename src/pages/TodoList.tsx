import React, { useState } from 'react'
import Input from '../components/Input'
import Text from '../components/Text'
import style from '../assets/scss/todolist.module.scss'

const TodoList: React.FC<{}> = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  return (
    <div className={style.todolist}>
      <div className={style.todolistLeft}>
        <Input
          value={title}
          placeholder="请输入代办内容"
          onChange={value => setTitle(value)}
        />
        <Text
          value={content}
          width="300px"
          height="200px"
          onChange={value => setContent(value)}
        />
      </div>
    </div>
  )
}

export default TodoList
