/**
 * Todo App
 * @author John Lin
 * @version 1.0.0
 * @description A simple todo list app built with React and SCSS.
 */

import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo'

function App() {
  const [todos, setTodos] = useState(() => {
    // Retrieve todos from local storage
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

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
        <h1>
          TODO
          <span class="material-symbols-outlined check-icon">check</span>
        </h1>
      </header>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <div className="footer-container">
        <span>@John Lin</span>
        <span className="footer">
          <a
            href="https://github.com/johnlin10/to-do-list"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </span>
      </div>
    </div>
  )
}

export default App
