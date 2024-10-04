import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/TodoList/AddTodo'

function App() {
  const [todos, setTodos] = useState([])

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
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
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
  )
}

export default App
