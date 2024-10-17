import { useState, useEffect } from 'react'
import './EditTodoModal.scss'

function EditTodoModal({ isOpen, onClose, todo, onSave }) {
  const [popAnimation, setPopAnimation] = useState(false)
  const [editedTodo, setEditedTodo] = useState(todo)

  useEffect(() => {
    setPopAnimation(true)
  }, [isOpen])

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

  const handleClose = () => {
    setPopAnimation(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // if (!isOpen) return null

  const handleSave = () => {
    onSave(editedTodo)
    handleClose()
  }

  return (
    <div
      className={`edit-todo-overlay ${popAnimation ? 'pop-animation' : ''}`}
      onClick={handleClose}
    >
      <div className="edit-todo-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={editedTodo.text ? editedTodo.text : ''}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, text: e.target.value })
          }
          autoFocus
        />
        <div className="edit-todo-importance-dueDate">
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
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave} disabled={!isTodoChanged()}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal
