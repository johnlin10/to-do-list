import { useState } from 'react'
import './AddTodo.scss'

function AddTodo({ addTodo }) {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0])
  const [importance, setImportance] = useState('normal') // other:

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    addTodo(text, dueDate, importance)
    setText('')
    setDueDate(new Date().toISOString().split('T')[0])
    setImportance('normal')
  }

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit} className="add-todo">
        <input
          type="text"
          placeholder="Add a new todo"
          autoFocus
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (!e.target.value) {
              setDueDate(new Date().toISOString().split('T')[0])
              setImportance('normal')
            }
          }}
        />
        <button
          type="submit"
          className={`add-todo-hint ${text.trim() ? 'active' : ''}`}
        >
          <span class="material-symbols-outlined">add</span>
        </button>
      </form>
      {text.trim() && (
        <div className="todo-details">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            name="importance"
            id="importance"
            className={`${
              importance === 'medium'
                ? 'medium'
                : importance === 'high'
                ? 'high'
                : ''
            }`}
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      )}
      <p className={`add-todo-hint ${text.trim() ? '' : 'hidden'}`}>
        Enter to add
      </p>
    </div>
  )
}

export default AddTodo
