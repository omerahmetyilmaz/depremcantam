import { useState } from 'react';

const LocationButton = () => {
    const [loading, setLoading] = useState(false);

    const handleLocationClick = () => {
        setLoading(true);

        if (!navigator.geolocation) {
            alert("Tarayıcınız konum servisini desteklemiyor.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Search query for Google Maps
                // "En yakın toplanma alanı" or "Emergency assembly point"
                const query = `En yakın toplanma alanı`;
                const url = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},15z`;

                window.open(url, '_blank');
                setLoading(false);
            },
            (error) => {
                console.error("Konum alınamadı:", error);
                alert("Konum alınamadı. Lütfen GPS izni verin.");
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <button
            className={`helper-btn location-btn ${loading ? 'loading' : ''}`}
            onClick={handleLocationClick}
            title="En Yakın Toplanma Alanı"
        >
            📍
        </button>
    );
};

export default LocationButton;
