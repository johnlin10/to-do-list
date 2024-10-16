import './Footer.scss'

function Footer({ version }) {
  return (
    <div className="footer-container">
      <span>@John Lin</span>
      <span className="footer">
        TODO v{version}
        {` `}
        <a
          className="text-link"
          href="https://github.com/johnlin10/to-do-list"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        {` `}
      </span>
    </div>
  )
}

export default Footer
