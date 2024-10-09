import { useState, useCallback } from 'react'
import TodoItem from './TodoItem'
import './TodoList.scss'

function TodoList({ todos, deleteTodo, toggleTodo }) {
  const [expandedItemId, setExpandedItemId] = useState(null)

  // set expanded item id
  const handleSetExpandedItemId = useCallback((id) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id))
  }, [])

  return (
    <ul className="todo-list">
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            setExpandedItemId={handleSetExpandedItemId}
            isExpanded={expandedItemId === todo.id}
          />
        ))}
    </ul>
  )
}

export default TodoList
