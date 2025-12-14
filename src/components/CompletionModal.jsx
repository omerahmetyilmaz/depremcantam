import React from 'react';

const CompletionModal = ({ onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
                <div className="confirm-icon">🎉🏆</div>
                <h2 className="confirm-title" style={{ color: '#16a34a', fontSize: '1.5rem' }}>Harika İş!</h2>
                <p className="confirm-text" style={{ fontSize: '1rem', color: '#334155', fontWeight: '600' }}>
                    Deprem çantanı eksiksiz hazırladın. Bu, senin ve sevdiklerinin güvenliği için atılmış dev bir adım!
                </p>

                <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '20px', textAlign: 'left' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📍 Çantayı Nereye Koymalısın?
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#166534', lineHeight: '1.4' }}>
                        <li>Çıkış kapısına en yakın yere (Hol/Antre).</li>
                        <li>Kolayca uzanıp alabileceğin bir yüksekliğe.</li>
                        <li>Üzerine başka eşya yığılmamış, görünür bir yere.</li>
                    </ul>
                </div>

                <button className="confirm-btn" style={{ background: '#16a34a', color: 'white', padding: '12px' }} onClick={onClose}>
                    Anlaşıldı, Çantam Hazır! ✅
                </button>
            </div>
        </div>
    );
};

export default CompletionModal;
