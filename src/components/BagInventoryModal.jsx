import { useState } from 'react';

function BagInventoryModal({ isOpen, onClose, packedItems, onRemoveItem, onRemoveAll, expirationDates, onUpdateDate }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>🎒 Çanta İçeriği</h2>
                    {packedItems.length > 0 && (
                        <button className="remove-all-btn" onClick={onRemoveAll}>
                            Hepsini Çıkar
                        </button>
                    )}
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="inventory-list">
                    {packedItems.length === 0 ? (
                        <div className="empty-state">
                            <p>Çantanız henüz boş.</p>
                            <p>Eşyaları eklemek için aşağıdan seçin.</p>
                        </div>
                    ) : (
                        packedItems.map(item => (
                            <div
                                key={item.id}
                                className="inventory-item click-to-remove"
                                onClick={() => onRemoveItem(item.id)}
                                title="Çıkarmak için tıkla"
                            >
                                <div className="inv-icon">{item.icon}</div>
                                <div className="inv-details">
                                    <div className="inv-name">{item.name}</div>
                                    <div className="inv-date" onClick={e => e.stopPropagation()}>
                                        <label>Son Kul:</label>
                                        <input
                                            type="date"
                                            value={expirationDates[item.id] || ''}
                                            onChange={(e) => onUpdateDate(item.id, e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Remove indicator removed as per user request */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BagInventoryModal;
