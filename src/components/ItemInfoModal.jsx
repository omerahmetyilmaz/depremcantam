function ItemInfoModal({ isOpen, onClose, item }) {
    if (!isOpen || !item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content info-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>ℹ️ Bilgi</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="info-body">
                    <div className="info-icon-large">{item.icon}</div>
                    <h3 className="info-title">{item.name}</h3>
                    <p className="info-text">
                        {item.info}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ItemInfoModal;
