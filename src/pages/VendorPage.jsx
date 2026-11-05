import { Link, useParams, useSearchParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import DietaryFilter from '../components/DietaryFilter.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams() // gets :id from URL
  const [searchParams, setSearchParams] = useSearchParams()
  const { vendors, loading, error, reload } = useVendors()
  
  const vendor = vendors.find((v) => v.id === id)

  const tagsParam = searchParams.get('tags')
  const selectedTags = tagsParam ? tagsParam.split(',') : []

  const filteredMenu = vendor ? vendor.menu.filter((item) => {
    if (selectedTags.length === 0) return true
    
    // check if item has ALL the selected tags
    const itemTags = item.tags ? item.tags.map(t => t.toLowerCase()) : []
    return selectedTags.every((tag) => itemTags.includes(tag))
  }) : []

  // update URL when a checkbox is clicked
  function handleToggleTag(tag) {
    let newTags = [...selectedTags]
    
    if (newTags.includes(tag)) {
      newTags = newTags.filter(t => t !== tag)
    } else {
      newTags.push(tag)
    }
    
    if (newTags.length === 0) {
      setSearchParams({})
    } else {
      setSearchParams({ tags: newTags.join(',') })
    }
  }
  
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />
  
  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">
          <Link to="/">Back to vendors</Link>
        </p>
      </div>
    )
  }

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>
      
      <DietaryFilter 
        selectedTags={selectedTags} 
        onToggleTag={handleToggleTag} 
      />

      {filteredMenu.length > 0 ? (
        <MenuList items={filteredMenu} />
      ) : (
        <p className="muted" style={{ marginTop: '1rem' }}>No items match your dietary filters.</p>
      )}
    </section>
  )
}

export default VendorPage