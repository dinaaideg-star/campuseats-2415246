import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
 
function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])

  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item])   // a NEW array, never cart.push()
  }
 
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
        
        // ✅ Instruction 4: Select the first vendor once data arrives
        if (data.length > 0 && selectedVendorId === null) {
          setSelectedVendorId(data[0].id)
        }
      })
      .catch((err) => {
        // Ignore AbortError (happens when component unmounts or request is cancelled)
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    // Cleanup function: aborts the fetch if the component unmounts
    return () => controller.abort()
    
  }, [reloadKey]) // Re-runs the effect whenever reloadKey changes

  // ✅ Instruction 3: Conditional rendering based on loading/error states
  let content
  if (loading) {
    content = <Loading />
  } else if (error) {
    // Passing a function to setReloadKey that adds 1 forces the useEffect to run again!
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    // Only render the menu if we have a selected vendor
    const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
    
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
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <main className="container">
        {content}
      </main>
      <Footer />
    </>
  )
}
 
export default App
