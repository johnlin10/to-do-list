import './Setting.scss'

function Setting({ isOpen, onClose, todos, setTodos }) {
  if (!isOpen) return null

  const exportTodoList = () => {
    const dataStr = JSON.stringify(todos)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const date = new Date()
    const exportFileDefaultName = `TODO_list_${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}${date.getHours()}${date.getMinutes()}.json`

    const a = document.createElement('a')
    a.href = dataUri
    a.download = exportFileDefaultName
    a.click()
  }

  const importTodoList = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTodos = JSON.parse(e.target.result)
          setTodos(importedTodos)
        } catch (error) {
          console.error('Error parsing JSON:', error)
          alert(
            'There is no way to import the file, make sure it is in a valid JSON format.'
          )
        }
      }
      reader.readAsText(file)
    }
  }

  const clearAllData = () => {
    if (window.confirm('All data will be cleared, are you sure?')) {
      setTodos([])
      localStorage.removeItem('todos')
    }
  }

  return (
    <div className="setting-overlay">
      <div className="setting-content">
        <button className="setting-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="setting-header">
          <h2>Setting</h2>
        </div>

        <div className="setting-body">
          <button className="setting-export" onClick={exportTodoList}>
            <span class="material-symbols-outlined">download</span>
            Export list
          </button>
          {/* 匯出並下載TODO JSON檔案 */}
          <p className="setting-tip">Export and Download TODO JSON File</p>

          <input
            type="file"
            accept=".json"
            className="setting-import"
            onChange={importTodoList}
            placeholder="Import TODO JSON file"
          />
          <p className="setting-tip">Import and Load TODO JSON file</p>
          <button className="setting-clear" onClick={clearAllData}>
            Clear todo list
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting
