/**
 * Todo App
 * @author John Lin
 * @version 1.5.1
 * @description A simple todo list app built with React and SCSS.
 */

import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'
import Setting from './components/Setting/Setting'

function App() {
  // Setting
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  // Todos
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const addTodo = (text, dueDate, importance) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, dueDate, importance, completed: false },
    ])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Refresh page
  const refreshPage = () => {
    window.location.reload(true)
  }

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <header>
        <div className="setting">
          <button onClick={() => setIsSettingOpen(true)}>
            <span class="material-symbols-outlined">settings</span>
          </button>
        </div>
        <div className="logo">
          <h1 onClick={refreshPage}>
            TODO
            <span class="material-symbols-outlined check-icon">check</span>
          </h1>
        </div>
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            <span class="material-symbols-outlined">contrast</span>
          </button>
        </div>
      </header>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <div className="footer-container">
        <span>@John Lin</span>
        <span className="footer">
          TODO v1.5.2{` `}
          <a
            href="https://github.com/johnlin10/to-do-list"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          {` `}
        </span>
      </div>
      <Setting
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  )
}

export default App
