import React, { useState } from 'react';
import { Input, message } from 'antd';
import style from '../assets/css/operate.module.scss';
import classNames from 'classnames/bind';
import { addList } from '../store/listSlice';
import { useDispatch } from 'react-redux';
const cls = classNames.bind(style);
const { Search } = Input;

export default function Operate() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const handleAdd = () => {
    if (inputValue.trim() === '') {
      message.warning('请输入内容后进行添加');
      return;
    }
    dispatch(addList({ value: inputValue }));
    setInputValue('');
  }
  return (
    <div className={cls('operate')}>
      <Search
        placeholder="请输入代办事项名称"
        enterButton="添加"
        value={inputValue}
        onChange={ event => setInputValue(event.target.value) }
        onSearch={() => handleAdd()}
      ></Search>
    </div>
  )
}
