function TodoItem({ todo, deleteTodo, toggleTodo, onEdit }) {
  return (
    <>
      <li>
        <div
          className="todo-item-container-wrapper"
          onClick={() => onEdit(todo)}
        >
          <div className="todo-item-container">
            <div
              className="todo-item-check"
              onClick={(e) => {
                e.stopPropagation()
                toggleTodo(todo.id)
              }}
            >
              <input
                type="checkbox"
                className={`${
                  todo.importance === 'medium'
                    ? 'importance-medium'
                    : todo.importance === 'high'
                    ? 'importance-high'
                    : ''
                }`}
                checked={todo.completed}
                readOnly
              />
              <div className="todo-container">
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </span>
                <div className="todo-details-view">
                  <span className="due-date">{todo.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="todo-option">
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </li>
    </>
  )
}

export default TodoItem
