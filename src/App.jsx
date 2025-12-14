import { useState, useRef, useEffect } from 'react'
import './App.css'
import { defaultItems } from './data/defaultItems'
import FlyingItem from './components/FlyingItem'
import SafetyTipBanner from './components/SafetyTipBanner'
import ProgressBar from './components/ProgressBar'
import BagInventoryModal from './components/BagInventoryModal'
import ItemInfoModal from './components/ItemInfoModal'
import ConfirmationModal from './components/ConfirmationModal'
import AdBanner from './components/AdBanner'
import LocationButton from './components/LocationButton'
import LeftHelperButtons from './components/LeftHelperButtons'
import CompletionModal from './components/CompletionModal'
import Confetti from './components/Confetti'
import AppInfoModal from './components/AppInfoModal'
import InterstitialAd from './components/InterstitialAd'

function App() {
  // Layout Update v4
  const [packedItemIds, setPackedItemIds] = useState([])
  const [flyingItems, setFlyingItems] = useState([])
  const [isBagBouncing, setIsBagBouncing] = useState(false)
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [infoItem, setInfoItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false)
  const [isFlashlightOn, setIsFlashlightOn] = useState(false)
  const [expirationDates, setExpirationDates] = useState({})

  // New Features
  const [showCompletion, setShowCompletion] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showAppInfo, setShowAppInfo] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)

  const bagRef = useRef(null)

  const packedCount = packedItemIds.length
  const totalItems = defaultItems.length
  const isComplete = packedCount === totalItems

  // Completion Effect
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setShowCompletion(true);
        setShowConfetti(true);

        // Stop confetti after 15 seconds
        setTimeout(() => setShowConfetti(false), 15000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  // Trigger Bag bounce
  const triggerBagEffect = () => {
    setIsBagBouncing(true)
    setTimeout(() => setIsBagBouncing(false), 300)
  }

  const handleItemClick = (e, item) => {
    if (packedItemIds.includes(item.id)) return;

    // Calculate positions
    const rect = e.currentTarget.getBoundingClientRect();
    const startPos = { x: rect.left, y: rect.top };

    // Bag position
    let endPos = { x: window.innerWidth / 2, y: 100 };
    if (bagRef.current) {
      const bagRect = bagRef.current.getBoundingClientRect();
      endPos = {
        x: bagRect.left + bagRect.width / 2 - 20,
        y: bagRect.top + bagRect.height / 2 - 20
      };
    }

    // Add flying item
    const flyingId = Date.now();
    setFlyingItems(prev => [...prev, { id: flyingId, item, startPos, endPos }]);

    // Add to packed list after flight
    setTimeout(() => {
      setPackedItemIds(prev => {
        if (prev.includes(item.id)) return prev;
        return [...prev, item.id];
      });
      triggerBagEffect();
    }, 800);
  };

  const removeFlyingItem = (id) => {
    setFlyingItems(prev => prev.filter(i => i.id !== id));
  };

  // Inventory Handlers
  const toggleInventory = () => {
    if (!isInventoryOpen) {
      // Show interstitial before opening bag (20% chance)
      if (Math.random() < 0.2) {
        setShowInterstitial(true);
      }
    }
    setIsInventoryOpen(!isInventoryOpen);
  };

  const handleRemoveItem = (id) => {
    setPackedItemIds(prev => prev.filter(itemId => itemId !== id));
  };

  const handleRemoveAllClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmRemoveAll = () => {
    setPackedItemIds([]);
    setShowConfirm(false);
  };

  const handleUpdateDate = (id, date) => {
    setExpirationDates(prev => ({ ...prev, [id]: date }));
  };

  const handleInfoClick = (e, item) => {
    e.stopPropagation(); // Don't trigger packing
    setInfoItem(item);
  };

  // Safety Tool Handlers
  const handleFlashlightToggle = () => {
    setIsFlashlightOn(!isFlashlightOn);
  };

  const handleEmergencyCallRequest = () => {
    setShowEmergencyConfirm(true);
  };

  const handleConfirmEmergencyCall = () => {
    window.open('tel:112');
    setShowEmergencyConfirm(false);
  };

  // Get full item objects for packed list
  const packedItemsList = defaultItems.filter(item => packedItemIds.includes(item.id));

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="bg-gradient"></div>
      </div>

      <div className="phone-frame" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative' // Added for containment
      }}>
        {/* Top: Backpack Area */}
        <div className="backpack-area" style={{ flex: '0 0 60%' }}>
          <div className="backpack-wrapper" onClick={toggleInventory} style={{ cursor: 'pointer' }}>
            <div className={`backpack-container ${isBagBouncing ? 'bounce' : ''}`} ref={bagRef}>
              <div className="big-bag-icon">
                <img src="/bag-transparent.png" alt="Backpack" />
              </div>
            </div>
          </div>
          <ProgressBar current={packedCount} total={totalItems} />

          {/* Flying Items Layer */}
          {flyingItems.map(obj => (
            <FlyingItem
              key={obj.id}
              item={obj.item}
              startPos={obj.startPos}
              endPos={obj.endPos}
            />
          ))}

          <SafetyTipBanner />

          {/* Quick Actions Bar (Centered) */}
          <div className="quick-actions-container">
            <LocationButton />
            <LeftHelperButtons
              onEmergencyCall={handleEmergencyCallRequest}
              onFlashlightToggle={handleFlashlightToggle}
            />

          </div>
        </div>

        {/* Bottom: Inventory */}
        <div className="items-scroll-container" style={{ flex: '0 0 40%' }}>
          <div className="shelf-header">
            Eşyaları Seç
          </div>
          <div className="supply-shelf">
            <div className="items-grid">
              {defaultItems.map(item => {
                const isPacked = packedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`item-card ${isPacked ? 'packed' : ''}`}
                    onClick={(e) => handleItemClick(e, item)}
                  >
                    <div className="item-icon-bg">{item.icon}</div>
                    <span className="item-name">{item.name}</span>
                    <button
                      className="info-btn"
                      onClick={(e) => handleInfoClick(e, item)}
                    >
                      i
                    </button>
                    {isPacked && <div className="check-mark">✅</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inventory Modal */}
        <BagInventoryModal
          isOpen={isInventoryOpen}
          onClose={toggleInventory}
          packedItems={packedItemsList}
          expirationDates={expirationDates}
          onRemoveItem={handleRemoveItem}
          onRemoveAll={handleRemoveAllClick}
          onUpdateDate={handleUpdateDate}
        />

        {/* Info Modal */}
        <ItemInfoModal
          isOpen={!!infoItem}
          onClose={() => setInfoItem(null)}
          item={infoItem}
        />

        {/* App Info Modal */}
        {showAppInfo && (
          <AppInfoModal onClose={() => setShowAppInfo(false)} />
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirm}
          message="Tüm eşyaları çıkarmak istediğinize emin misiniz?"
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmRemoveAll}
        />

        {/* Emergency Call Confirmation */}
        <ConfirmationModal
          isOpen={showEmergencyConfirm}
          message="⚠️ DİKKAT: 112 Acil Servis aranacak. Emin misiniz?"
          onClose={() => setShowEmergencyConfirm(false)}
          onConfirm={handleConfirmEmergencyCall}
          confirmLabel="Evet, Ara"
        />

        {/* Flashlight Overlay */}
        {isFlashlightOn && (
          <div className="flashlight-overlay" onClick={handleFlashlightToggle}>
            <button className="flashlight-off-btn">🔦 KAPAT</button>
          </div>
        )}

        {/* Completion Modal */}
        {showCompletion && (
          <CompletionModal onClose={() => setShowCompletion(false)} />
        )}

        {/* Confetti Effect */}
        {showConfetti && <Confetti />}

        {/* Interstitial Ad */}
        {showInterstitial && (
          <InterstitialAd onClose={() => setShowInterstitial(false)} skipDelay={5} />
        )}

        {/* Monetization: Ad Banner */}
        <AdBanner />

      </div>
    </>
  )
}

export default App
