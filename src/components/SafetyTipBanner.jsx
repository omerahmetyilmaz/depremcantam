import { useState, useEffect } from 'react';
import { safetyTips } from '../data/safetyTips';

function SafetyTipBanner() {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        // Cycle tip every 8 seconds
        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="safety-tip-banner">
            <div className="tip-icon">ℹ️</div>
            <div className="tip-content">
                <span className="tip-label">Biliyor muydunuz?</span>
                <p className="tip-text" key={currentTipIndex /* Key change triggers animation */}>
                    {safetyTips[currentTipIndex]}
                </p>
            </div>
        </div>
    );
}

export default SafetyTipBanner;
