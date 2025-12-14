import { defaultItems } from '../data/defaultItems';

export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notifications");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }

    return false;
};

export const checkExpirations = (expirationDates) => {
    if (Notification.permission !== "granted") return;

    const today = new Date();
    const alertThresholdDays = 30; // Notify if executing within 30 days

    Object.entries(expirationDates).forEach(([itemId, dateString]) => {
        if (!dateString) return;

        const expiryDate = new Date(dateString);
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Logic: If expired OR expires soon (and hasn't been notified TODAY)
        if (daysDiff <= alertThresholdDays) {
            const item = defaultItems.find(i => i.id === parseInt(itemId));
            if (!item) return;

            const storageKey = `notified_${itemId}_${new Date().toDateString()}`;
            if (localStorage.getItem(storageKey)) return; // Already triggered today

            // Determine Message
            let title = `⚠️ Eşya Kontrolü: ${item.name}`;
            let body = "";

            if (daysDiff < 0) {
                body = `${item.name} ürününün kullanım tarihi GEÇMİŞ! Lütfen yenileyin.`;
            } else if (daysDiff === 0) {
                body = `${item.name} ürününün kullanım tarihi BUGÜN doluyor!`;
            } else {
                body = `${item.name} ürününün tarihi dolmak üzere (${daysDiff} gün kaldı).`;
            }

            // Send Notification
            new Notification(title, {
                body: body,
                icon: '/bag-transparent.png', // Uses the app icon
                badge: '/bag-transparent.png'
            });

            // Mark as sent for today
            localStorage.setItem(storageKey, 'true');
        }
    });
};
