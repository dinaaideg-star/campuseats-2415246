const DIETARY_TAGS = ['Vegetarian', 'Vegan', 'Spicyy', 'Gluten-Free', 'Halal']

function DietaryFilter({ selectedTags, onToggleTag }) {
  return (
    <div className="filter-bar" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <strong style={{ marginRight: '0.5rem' }}>Filter by diet:</strong>
      {DIETARY_TAGS.map((tag) => {
        const tagLower = tag.toLowerCase()
        const isChecked = selectedTags.includes(tagLower)
        
        return (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggleTag(tagLower)}
            />
            {tag}
          </label>
        )
      })}
    </div>
  )
}

export default DietaryFilter
