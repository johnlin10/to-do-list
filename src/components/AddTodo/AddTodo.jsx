import { useState } from 'react'
import './AddTodo.scss'

function AddTodo({ addTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    addTodo(text)
    setText('')
  }

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit} className="add-todo">
        <input
          type="text"
          placeholder="Add a new todo"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className={`add-todo-hint ${text.trim() ? 'active' : ''}`}
        >
          <span class="material-symbols-outlined">add</span>
        </button>
      </form>
      <p className={`add-todo-hint ${text.trim() ? '' : 'hidden'}`}>
        Enter to add
      </p>
    </div>
  )
}

export default AddTodo
