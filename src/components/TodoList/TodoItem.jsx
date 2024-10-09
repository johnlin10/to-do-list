import { useRef, useEffect, useCallback } from 'react'

function TodoItem({
  todo,
  deleteTodo,
  toggleTodo,
  setExpandedItemId,
  isExpanded,
}) {
  const containerRef = useRef(null)
  const isExpandedRef = useRef(isExpanded)
  const timeoutRef = useRef(null)

  // update isExpandedRef
  useEffect(() => {
    isExpandedRef.current = isExpanded
  }, [isExpanded])

  // toggle todo
  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  // scroll handle
  const handleScroll = useCallback(
    (e) => {
      const container = e.target
      const scrollLeft = container.scrollLeft

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        if (scrollLeft > 10 && !isExpandedRef.current) {
          setExpandedItemId(todo.id)
        } else if (scrollLeft === 0 && isExpandedRef.current) {
          setExpandedItemId(null)
        }
      }, 30)
    },
    [todo.id, setExpandedItemId]
  )

  // reset scroll
  useEffect(() => {
    if (!isExpanded && containerRef.current) {
      containerRef.current.scrollLeft = 0
    }
  }, [isExpanded])

  // add event listener
  useEffect(() => {
    const currentContainer = containerRef.current
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])

  return (
    <>
      <li onScroll={handleScroll} ref={containerRef}>
        <div className="todo-item-container-wrapper">
          <div className="todo-item-container" onClick={handleToggle}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
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
