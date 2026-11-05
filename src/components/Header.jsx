import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function Header() {
  const { count } = useCart()

  return (
    <header className="header">
      <NavLink to="/" className="logo-link">
        <h1 className="logo">CampusEats</h1>
      </NavLink>
      <nav className="nav">
        {/* 'end' is important so it doesn't stay active on other pages starting with / */}
        <NavLink to="/" end className={({ isActive }) => isActive ? 'link active' : 'link'}>Vendors</NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? 'link active' : 'link'}>My Orders</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'link cart active' : 'link cart'}>
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header