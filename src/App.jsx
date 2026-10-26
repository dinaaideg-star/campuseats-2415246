import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import DietaryFilter from './components/DietaryFilter.jsx'
 
function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')   // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  const [selectedTags, setSelectedTags] = useState([])

  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item])   // a NEW array, never cart.push()
  }
 
  // B2: Fetch vendors from mock API -----------------------------------------
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        
        if (data.length > 0 && selectedVendorId === null) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
    
  }, [reloadKey]) // Re-runs the effect whenever reloadKey changes

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // B3: Real Cart -----------------------------------------------------------
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // B5: Handle order placement ----------------------------------------------
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // B6: Dietary Filter State ------------------------------------------------
  function handleToggleTag(tag) {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    )
  }

  const filteredMenu = selectedVendor?.menu.filter((item) => {
    if (selectedTags.length === 0) {
      return true;
    }
    const itemTags = item.tags 
      ? item.tags.map(t => t.toLowerCase()) 
      : [];
    return selectedTags.every((tag) => itemTags.includes(tag));
  }) || [];

  // Conditional rendering based on loading/error states ---------------------
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Order Placed Successfully! 🎉</h2>
        <p><strong>Name:</strong> {lastOrder?.name}</p>
        <p><strong>Mahallah:</strong> {lastOrder?.mahallah}</p>
        <p><strong>Pickup Time:</strong> {lastOrder?.pickupTime}</p>
        <p className="cart-total" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          Total Paid: RM{lastOrder?.total.toFixed(2)}
        </p>
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1.5rem' }}>
          Back to Menu
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={(id) => {
                  setSelectedVendorId(id)
                  setView('menu')
                  setSelectedTags([]) // Reset filters when switching vendors
                }}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            {/* B6: Render the Filter Component */}
            <DietaryFilter 
              selectedTags={selectedTags} 
              onToggleTag={handleToggleTag} 
            />
            
            {/* B6: Render the Filtered Menu */}
            {filteredMenu.length > 0 ? (
              <MenuList items={filteredMenu} onAdd={handleAddToCart} />
            ) : (
              <p className="muted">No items match your dietary filters.</p>
            )}
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
