function ItemRow({ item, isChecked, onToggle }) {
    return (
        <div
            className={`item-row ${isChecked ? 'checked' : ''}`}
            onClick={() => onToggle(item.id)}
        >
            <div className="checkbox">
                {isChecked ? 'X' : ' '}
            </div>
            <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-points">+{item.points} PTS</span>
            </div>
        </div>
    )
}

export default ItemRow
