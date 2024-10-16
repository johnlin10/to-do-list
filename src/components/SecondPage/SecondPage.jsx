import './SecondPage.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SecondPage({ title, children }) {
  const navigate = useNavigate()
  const [pageAnimation, setPageAnimation] = useState(false)

  const handleBack = () => {
    setPageAnimation(false)
    setTimeout(() => {
      navigate(-1)
    }, 300)
  }

  useEffect(() => {
    setPageAnimation(true)
  }, [])

  return (
    <div className={`second-page ${pageAnimation ? 'page-animation' : ''}`}>
      <div className="second-page-header">
        <button className="back-button" onClick={handleBack}>
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="second-page-title">{title}</h1>
        <div className="second-page-header-space"></div>
      </div>
      <div className="second-page-content">{children}</div>
    </div>
  )
}

export default SecondPage
