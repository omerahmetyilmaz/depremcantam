function ItemCard({ item, isPacked, onToggle }) {
    return (
        <div
            className={`item-card ${isPacked ? 'packed' : ''}`}
            onClick={() => onToggle(item.id)}
        >
            <div className="item-icon">{item.icon}</div>
            <div className="item-name">{item.name}</div>
        </div>
    )
}

export default ItemCard
