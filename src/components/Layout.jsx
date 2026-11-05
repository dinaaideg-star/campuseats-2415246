import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet /> {/* This is where HomePage, CartPage, etc. will appear */}
      </main>
      <Footer />
    </>
  )
}

export default Layout