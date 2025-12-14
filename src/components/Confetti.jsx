import React, { useEffect, useState } from 'react';

const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const Confetti = () => {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        // Generate fixed number of particles
        const particleCount = 100;
        const newPieces = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // % left
            delay: Math.random() * 15, // delay spread over 15s
            duration: 2 + Math.random() * 3, // fall speed
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 5 + Math.random() * 10,
        }));
        setPieces(newPieces);
    }, []);

    return (
        <div className="confetti-container">
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.x}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        // Loop the animation slightly to ensure density for 15s
                        animationIterationCount: 'infinite'
                    }}
                />
            ))}
        </div>
    );
};

export default Confetti;
