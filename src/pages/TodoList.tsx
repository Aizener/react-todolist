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
  const [flist, setFlist] = useState<Array<{[props: string]: any}>>([])
  let dragType = 0
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
      <div
        className={style.todolistMiddle}
        onDragEnter={e => {
          if (dragType !== 2) {
            return
          }
          const el = document.querySelector('#list-left') as HTMLElement
          el.style.boxShadow = `3px 3px 5px inset #ccc, -3px -3px 5px inset #eee`
        }}
        onDragLeave={e => {
          if (dragType !== 2) {
            return
          }
          ;(e.target as HTMLElement).style.boxShadow = 'none'
        }}
        onDragOver={e => {
          e.preventDefault()
        }}
        onDrop={e => {
          if (dragType !== 2) {
            return
          }
          const el = document.querySelector('#list-left') as HTMLElement
          el.style.boxShadow = 'none'
          let data: any = e.dataTransfer.getData('detail')
          data = JSON.parse(data)
          const _list = flist.slice()
          _list.splice(data.idx, 1)
          setFlist(_list)
          setList([...list, { title: data.title, content: data.content }])
          e.preventDefault()
        }}
      >
        <ul id="list-left" className={style.list}>
          {
            list.map((item, idx) => (
              <li
                key={idx}
                className={style.listItem}
                draggable
                onDragStart={e => {
                  dragType = 1
                  e.dataTransfer.setData('detail', JSON.stringify({...item, idx}))
                  ;(e.target as HTMLElement).style.boxShadow = '0 0 10px gray'
                }}
                onDragEnd={e => {
                  (e.target as HTMLElement).style.boxShadow = ''
                }}
              >
                <p className={style.listItemTitle}>{item.title}</p>
                <p className={style.listItemContent}>{item.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div
        className={style.todolistRight}
        onDragEnter={e => {
          if (dragType !== 1) {
            return
          }
          const el = document.querySelector('#list-right') as HTMLElement
          el.style.boxShadow = `3px 3px 5px inset #ccc, -3px -3px 5px inset #eee`
        }}
        onDragLeave={e => {
          if (dragType !== 1) {
            return
          }
          (e.target as HTMLElement).style.boxShadow = 'none'
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          if (dragType !== 1) {
            return
          }
          const el = document.querySelector('#list-right') as HTMLElement
          el.style.boxShadow = 'none'
          let data: any = e.dataTransfer.getData('detail')
          data = JSON.parse(data)
          const _list = list.slice()
          _list.splice(data.idx, 1)
          setList(_list)
          setFlist([...flist, { title: data.title, content: data.content }])
          e.preventDefault()
        }}
      >
        <ul id="list-right" className={style.list}>
          {
            flist.map((item, idx) => (
              <li
                key={idx}
                className={`${style.listItem} ${style.listItemFinished}`}
                draggable
                onDragStart={e => {
                  dragType = 2
                  e.dataTransfer.setData('detail', JSON.stringify({...item, idx}))
                  ;(e.target as HTMLElement).style.boxShadow = '0 0 10px gray'
                }}
                onDragEnd={e => {
                  (e.target as HTMLElement).style.boxShadow = ''
                }}
              >
                <p className={style.listItemTitle}>{item.title}</p>
                <p className={style.listItemContent}>{item.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default TodoList
