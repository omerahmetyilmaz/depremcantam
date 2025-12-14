import { useState, useEffect } from 'react';
import './InterstitialAd.css';

function InterstitialAd({ onClose, skipDelay = 5 }) {
    const [countdown, setCountdown] = useState(skipDelay);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanSkip(true);
        }
    }, [countdown]);

    return (
        <div className="interstitial-overlay">
            <div className="interstitial-content">
                {/* Ad Header */}
                <div className="interstitial-header">
                    <span className="ad-label">REKLAM</span>
                    {canSkip ? (
                        <button className="skip-btn" onClick={onClose}>
                            Atla ✕
                        </button>
                    ) : (
                        <span className="skip-countdown">
                            {countdown} saniye sonra atla
                        </span>
                    )}
                </div>

                {/* Ad Content */}
                <div className="interstitial-body">
                    <div className="ad-placeholder">
                        <div className="ad-icon">📢</div>
                        <h2>Reklam Alanı</h2>
                        <p>Tam ekran reklam burada görünecek</p>
                        <div className="ad-sponsor">
                            <span>Sponsorlu İçerik</span>
                        </div>
                    </div>
                </div>

                {/* Ad Footer */}
                <div className="interstitial-footer">
                    <p>Bu uygulama reklamlarla desteklenmektedir</p>
                </div>
            </div>
        </div>
    );
}

export default InterstitialAd;
