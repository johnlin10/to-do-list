import './Header.scss'
import { Link } from 'react-router-dom'

function Header({ refreshPage, setIsSettingOpen, theme, toggleTheme }) {
  return (
    <header>
      <div className="setting">
        <Link to="/setting" name="Setting">
          <span class="material-symbols-outlined">settings</span>
        </Link>
      </div>
      <div className="logo">
        <h1 onClick={refreshPage} name="TODO">
          TODO
          <span class="material-symbols-outlined check-icon">check</span>
        </h1>
      </div>
      <div className="theme-toggle">
        <button onClick={toggleTheme} name={`Theme mode: ${theme}`}>
          <span class="material-symbols-outlined">contrast</span>
        </button>
      </div>
    </header>
  )
}

export default Header
