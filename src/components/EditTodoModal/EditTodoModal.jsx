import { useState, useEffect } from 'react'
import './EditTodoModal.scss'

function EditTodoModal({ isOpen, onClose, todo, onSave }) {
  const [editedTodo, setEditedTodo] = useState(todo)

  const isTodoChanged = () => {
    return (
      editedTodo.text !== todo.text ||
      editedTodo.importance !== todo.importance ||
      editedTodo.dueDate !== todo.dueDate
    )
  }

  useEffect(() => {
    setEditedTodo(todo)
  }, [todo])

  // if (!isOpen) return null

  const handleSave = () => {
    onSave(editedTodo)
    onClose()
  }

  return (
    <div className="edit-todo-overlay">
      <div className="edit-todo-content">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={editedTodo.text ? editedTodo.text : ''}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, text: e.target.value })
          }
        />
        <div className="edit-todo-importance">
          {/* <div
            className={`edit-todo-importance-circle ${
              editedTodo.importance === 'medium'
                ? 'importance-medium'
                : editedTodo.importance === 'high'
                ? 'importance-high'
                : ''
            }`}
          ></div> */}
          <select
            className={`${
              editedTodo.importance === 'medium'
                ? 'importance-medium'
                : editedTodo.importance === 'high'
                ? 'importance-high'
                : ''
            }`}
            value={editedTodo.importance}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, importance: e.target.value })
            }
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={editedTodo.dueDate}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, dueDate: e.target.value })
            }
          />
        </div>
        <div className="edit-todo-actions">
          <button onClick={handleSave} disabled={!isTodoChanged()}>
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal
