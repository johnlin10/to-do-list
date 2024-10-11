import TodoItem from './TodoItem'
import './TodoList.scss'

function TodoList({ todos, deleteTodo, toggleTodo }) {
  // 放棄最佳化滑動刪除的功能
  return (
    <ul className="todo-list">
      {todos.length > 0 && (
        <p className="todo-delete-tip">
          <span class="material-symbols-outlined">
            keyboard_double_arrow_left
          </span>{' '}
          Slide to show delete
        </p>
      )}
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
    </ul>
  )
}

export default TodoList
