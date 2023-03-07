import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Empty, Checkbox,  message } from 'antd';
import classNames from 'classnames/bind';
import style from '../assets/css/list.module.scss';
import { removeList } from '@/store/listSlice';
import store from '@/store';
const cls = classNames.bind(style);

const renderListItems = (list, { dispatch, setShowList }) => {
  const handleRemove = (idx) => {
    dispatch(removeList({ value: idx }))
  }
  const handleConfirm = (item, idx) => {
    item.isEdit ? handleSave(item, idx, true) : handleEdit(item, idx, true);
  }
  const updateList = (item, idx) => {
    const _list = [...list];
    const _item = {...item};
    _item.title = item.title;
    _item.isEdit = item.isEdit;
    _item.inputValue = item.inputValue;
    _item.isFinish = item.isFinish;
    _list[idx] = _item;
    setShowList(_list);
  }
  const handleEdit = (item, idx, isEdit) => {
    updateList({
      ...item,
      isEdit,
      inputValue: isEdit ? item.inputValue : item.title
    }, idx);
  }
  const handleSave = (item, idx) => {
    if (item.inputValue.trim() === '') {
      message.warning('请输入内容后进行保存');
      return;
    }
    updateList({
      ...item,
      isEdit: false,
      title: item.inputValue
    }, idx);
    message.success('保存成功');
  }
  const handleChangeValue = (item, idx, value) => {
    updateList({
      ...item,
      inputValue: value
    }, idx);
  }
  const handleChangeStatus = (checked, item, idx) => {
    updateList({
      ...item,
      isFinish: checked
    }, idx);
  }
  return (
    list.length
      ?
      list.map((item, idx) => (
        <div
          className={cls('list-item', `${item.isFinish ? 'item-finish' : ''}`)}
          key={idx}
        >
          <div className={cls('item-left')}>
            {
              item.isEdit
                ? <Input
                  value={item.inputValue}
                  onInput={ event => handleChangeValue(item, idx, event.target.value) }
                  placeholder='请输入新内容'
                ></Input>
                : <Checkbox defaultChecked={item.isFinish} onChange={(event) => handleChangeStatus(event.target.checked, item, idx)}>{item.title}</Checkbox>
              }
          </div>
          <div className={cls('item-right')}>
            <Button className={cls('btn-item')} type="primary" onClick={() => handleConfirm(item, idx)}>
              { item.isEdit ? '保存' : '编辑' }
            </Button>
            {
              item.isEdit
                ? <Button className={cls('btn-item')} onClick={() => handleEdit(item, idx, false)}>取消</Button>
                : <Button className={cls('btn-item')} type="primary" danger onClick={() => handleRemove(idx)}>删除</Button>
            }
          </div>
        </div>
      ))
      : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}

export default function List() {
  const dispatch = useDispatch();
  const getList = () => {
    return store.getState().listReducer.value.map(item => ({ isEdit: false, title: item, inputValue: item, isFinish: false  }));
  }
  const [showList, setShowList] = useState(getList());
  const detail = useMemo(() => {
    return {
      total: showList.length,
      finish: showList.filter(item => item.isFinish).length
    };
  }, [showList]);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setShowList(getList());
    });
    return () => {
      unsubscribe();
    }
  });
  return (
    <div className={cls('list')}>
      {
        renderListItems(showList, {
          dispatch,
          setShowList
        })
      }
      { showList.length ? <div className={cls('list-total')}>共计{detail.total}个代办事项，已完成{detail.finish}个</div> : '' }
    </div>
  )
}
