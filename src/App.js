/**
 * Todo App
 * @author John Lin
 * @version 1.3.0
 * @description A simple todo list app built with React and SCSS.
 */

import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'

function App() {
  // Todos
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

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

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
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

  return (
    <div className="App">
      <header>
        <div className="empty"></div>
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
          TODO v1.3.0{` `}
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
    </div>
  )
}

export default App
