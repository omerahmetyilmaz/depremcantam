function Backpack({ packedItems, totalItemsCount }) {
    return (
        <div className="backpack-container">
            <div className="bag-header">
                <h2>🎒 Your Bag</h2>
                <div className="bag-stats">
                    {packedItems.length} / {totalItemsCount} Packed
                </div>
            </div>

            {packedItems.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-bag-icon">🎒</div>
                    <p>Tap items to pack them</p>
                </div>
            ) : (
                <div className="bag-grid">
                    {packedItems.map(item => (
                        <div key={item.id} className="bag-item" title={item.name}>
                            {item.icon}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Backpack
