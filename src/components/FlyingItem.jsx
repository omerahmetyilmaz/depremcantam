import { useEffect, useState } from 'react';

const FlyingItem = ({ item, startPos, endPos, onComplete }) => {
    const [style, setStyle] = useState({
        position: 'fixed',
        left: startPos.x,
        top: startPos.y,
        transform: 'scale(1)',
        opacity: 1,
        transition: 'all 0.8s cubic-bezier(0.42, 0, 0.58, 1)',
        zIndex: 1000,
        fontSize: '3rem',
        pointerEvents: 'none'
    });

    useEffect(() => {
        // Trigger animation in next frame
        requestAnimationFrame(() => {
            setStyle(prev => ({
                ...prev,
                left: endPos.x,
                top: endPos.y,
                transform: 'scale(0.5)',
                opacity: 0
            }));
        });

        // Cleanup
        const timer = setTimeout(onComplete, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flying-item-wrapper" style={style}>
            {item.icon}
            <span style={{ position: 'absolute', opacity: 0.5, fontSize: '1rem', left: -10 }}>💨</span>
        </div>
    );
};

export default FlyingItem;
