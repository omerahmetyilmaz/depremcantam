function ConfirmationModal({ isOpen, onClose, onConfirm, message, confirmLabel = "Evet, Sil", cancelLabel = "Hayır" }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 2000 }}>
            <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
                <div className="confirm-icon">⚠️</div>
                <h3 className="confirm-title">Emin misiniz?</h3>
                <p className="confirm-text">{message}</p>

                <div className="confirm-actions">
                    <button className="confirm-btn cancel" onClick={onClose}>
                        {cancelLabel}
                    </button>
                    <button className="confirm-btn danger" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
