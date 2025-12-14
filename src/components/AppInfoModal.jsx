import React from 'react';

const AppInfoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 3000 }}>
            <div className="modal-content info-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <h2 className="modal-title">📌 Uygulama Rehberi</h2>

                <div className="app-info-content">
                    <p className="app-description">
                        Bu uygulama, deprem çantanızı eksiksiz hazırlamanıza yardımcı olan interaktif bir simülasyondur. Ayrıca acil durumlarda kullanabileceğiniz hayat kurtarıcı araçlar içerir.
                    </p>

                    <h3 className="info-subtitle">🛠️ Araçlar ve Butonlar</h3>

                    <ul className="info-list">
                        <li>
                            <span className="info-icon">📍</span>
                            <div>
                                <strong>Toplanma Alanı:</strong>
                                <small>Size en yakın güvenli toplanma alanını haritada gösterir.</small>
                            </div>
                        </li>
                        <li>
                            <span className="info-icon">📢</span>
                            <div>
                                <strong>Düdük:</strong>
                                <small>Yüksek sesli siren çalarak yerinizi belli etmenizi sağlar.</small>
                            </div>
                        </li>
                        <li>
                            <span className="info-icon">🔦</span>
                            <div>
                                <strong>Fener:</strong>
                                <small>Ekranı maksimum parlaklıkta beyaz yaparak aydınlatma sağlar.</small>
                            </div>
                        </li>
                        <li>
                            <span className="info-icon">📞</span>
                            <div>
                                <strong>112 Acil:</strong>
                                <small>Tek tuşla 112 Acil Servis'i aramanızı sağlar.</small>
                            </div>
                        </li>
                        <li>
                            <span className="info-icon">🎒</span>
                            <div>
                                <strong>Çanta:</strong>
                                <small>Hazırladığınız eşyaları ve son kullanma tarihlerini yönetir.</small>
                            </div>
                        </li>
                    </ul>

                    <div className="info-footer">
                        <small>Depreme her zaman hazırlıklı olun! 💪</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppInfoModal;
