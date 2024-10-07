import { useRef } from 'react'

function TodoItem({ todo, deleteTodo, toggleTodo }) {
  const touchedRef = useRef(false)

  const handleToggle = (event) => {
    event.preventDefault()

    // 防止 touchstart 和 click 同時觸發
    if (event.type === 'touchend') {
      touchedRef.current = false
      return
    }
    if (event.type === 'touchstart') {
      touchedRef.current = true
    }
    if (event.type === 'click' && touchedRef.current) {
      return
    }

    toggleTodo(todo.id)
  }

  return (
    <li>
      <div
        className="todo-item-container"
        onTouchStart={handleToggle}
        onClick={handleToggle}
      >
        <input type="checkbox" checked={todo.completed} readOnly />
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
      </div>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        <span class="material-symbols-outlined">close</span>
      </button>
    </li>
  )
}

export default TodoItem
