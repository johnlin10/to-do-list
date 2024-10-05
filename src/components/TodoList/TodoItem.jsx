function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
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
