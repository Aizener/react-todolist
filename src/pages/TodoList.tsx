import React, { useState } from 'react'
import Input from '../components/Input'
import Text from '../components/Text'
import Button from '../components/Button'
import style from '../assets/scss/todolist.module.scss'
import { useRootContext } from '../App'

const TodoList: React.FC<{}> = () => {
  const { state, setState }: any = useRootContext()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [list, setList] = useState<Array<{[props: string]: any}>>([])
  return (
    <div className={style.todolist}>
      <div className={style.todolistLeft}>
        <div className={`${style.row} ${style.rowTop0}`}>
          <Input
            value={title}
            width="300px"
            placeholder="请输入代办标题"
            onChange={value => setTitle(value)}
          />
        </div>
        <div className={style.row}>
          <Text
            value={content}
            width="300px"
            height="200px"
            placeholder="请输入代办内容"
            onChange={value => setContent(value)}
          />
        </div>
        <div className={style.row}>
          <Button
            width="300px"
            type="primary"
            onClick={() => {
              if (!title.trim() || !content.trim()) {
                setState({
                  ...state,
                  showToast: true
                })
                return
              }
              setTitle('')
              setContent('')
              setList([
                ...list,
                { title, content }
              ])
            }
          }>添加事项</Button>
        </div>
      </div>
      <div className={style.todolistMiddle}>
        <ul className={style.list}>
          {
            list.map((item, idx) => (
              <li key={idx} className={style.listItem} draggable>
                <p className={style.listItemTitle}>{item.title}</p>
                <p className={style.listItemContent}>{item.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={style.todolistRight}>right</div>
    </div>
  )
}

export default TodoList
