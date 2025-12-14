import { useState, useEffect, useRef } from 'react';

const LeftHelperButtons = ({ onEmergencyCall, onFlashlightToggle }) => {
    const [isWhistleActive, setIsWhistleActive] = useState(false);
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);

    // Whistle Logic (Web Audio API)
    const toggleWhistle = () => {
        if (isWhistleActive) {
            stopWhistle();
        } else {
            startWhistle();
        }
    };

    const startWhistle = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle'; // Piercing sound
            osc.frequency.setValueAtTime(3000, ctx.currentTime); // High pitch (3kHz)

            // Modulate volume for "whistle" effect
            gain.gain.setValueAtTime(0.5, ctx.currentTime);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();

            oscillatorRef.current = osc;
            setIsWhistleActive(true);
        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    const stopWhistle = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
        }
        setIsWhistleActive(false);
    };

    // Cleanup whistle on unmount
    useEffect(() => {
        return () => stopWhistle();
    }, []);

    return (
        <>
            {/* Whistle Button */}
            <button
                className={`helper-btn whistle ${isWhistleActive ? 'active' : ''}`}
                onClick={toggleWhistle}
                title="Düdük"
            >
                📢
            </button>

            {/* Flashlight Button */}
            <button
                className="helper-btn flashlight"
                onClick={onFlashlightToggle}
                title="Fener"
            >
                🔦
            </button>

            {/* 112 Call Button */}
            <button
                className="helper-btn emergency"
                onClick={onEmergencyCall}
                title="112 Acil"
            >
                📞
            </button>
        </>
    );
};

export default LeftHelperButtons;
