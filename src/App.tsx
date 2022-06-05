import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Frame from './pages/Frame'
import TodoList from './pages/TodoList'
import Schedule from './pages/Schedule'
import Toast from './components/Toast'
import { useState, createContext, useContext } from 'react'

export const RootContext: any = createContext({})
export const useRootContext = () => useContext(RootContext)
function App() {
  const [state, setState] = useState({
    msg: 'hello.',
    showToast: false
  })
  
  return (
    <RootContext.Provider value={{ state, setState }}>
      <div className="App">
        <Toast>请输入内容</Toast>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Frame />}>
              <Route path="todolist" element={<TodoList />}></Route>
              <Route path="schedule" element={<Schedule />}></Route>
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </RootContext.Provider>
  );
}

export default App;
