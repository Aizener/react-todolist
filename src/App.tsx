import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Frame from './pages/Frame'
import TodoList from './pages/TodoList'
import Schedule from './pages/Schedule'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route path="todolist" element={<TodoList />}></Route>
            <Route path="schedule" element={<Schedule />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
