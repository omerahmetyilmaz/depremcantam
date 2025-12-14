import ItemRow from './ItemRow'

function ItemList({ items, checkedItems, onItemToggle }) {
    return (
        <div className="item-list">
            {items.map(item => (
                <ItemRow
                    key={item.id}
                    item={item}
                    isChecked={checkedItems.includes(item.id)}
                    onToggle={onItemToggle}
                />
            ))}
        </div>
    )
}

export default ItemList
