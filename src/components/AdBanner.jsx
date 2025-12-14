import { useState } from 'react';

function AdBanner() {
    const [adVisible, setAdVisible] = useState(true);

    if (!adVisible) return null;

    return (
        <div className="ad-banner-container">
            <div className="ad-label">REKLAM</div>
            <div className="ad-content">
                <div className="ad-icon">📢</div>
                <div className="ad-text">
                    <span className="ad-title">Google Reklam Alanı</span>
                    <span className="ad-desc">Burada gerçek reklamlar gösterilecek.</span>
                </div>
                <button className="ad-action">YÜKLE</button>
            </div>
            <button className="ad-close" onClick={() => setAdVisible(false)}>×</button>
        </div>
    );
}

export default AdBanner;
