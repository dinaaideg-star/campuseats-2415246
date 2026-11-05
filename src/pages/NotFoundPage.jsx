import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      
      {/* Added a tiny inline style just in case the text is still invisible */}
      <Link to="/" className="btn" style={{ color: 'white', textDecoration: 'none' }}>
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage