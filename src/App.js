/**
 * Todo App
 * @author John Lin
 * @version 1.5.3
 * @description A simple to-do list PWA built with React and SCSS.
 */

import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'
import Setting from './components/Setting/Setting'
import Footer from './components/Footer/Footer'

const version = '1.5.3'

function App() {
  // Setting
  const [isSettingOpen, setIsSettingOpen] = useState(false)

  // Todos
  const [todos, setTodos] = useState(() => {
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

    // update meta theme-color
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'light' ? '#ffffff' : '#131313'
      )
    }
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
      <Header
        refreshPage={refreshPage}
        setIsSettingOpen={setIsSettingOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <Footer version={version} />
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
