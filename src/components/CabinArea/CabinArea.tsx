import { useState, type MouseEvent } from "react";
import cabinImage from "../../assets/Cabin-summer.png";
import pointerIcon from "../../assets/pointer.png";
import "./CabinArea.css";

type FloatingKos = {
  id: number;
  x: number;
  y: number;
  amount: number;
};

type CabinAreaProps = {
  kosPerClick: number;
  onCabinClick: () => void;
  autoClickers: {
    id: number;
    xPercent: number;
    yPercent: number;
  }[];
  activeWaffle: {
    id: number;
    xPercent: number;
    yPercent: number;
  } | null;
  onWaffleClick: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CabinArea({
  kosPerClick,
  onCabinClick,
  autoClickers,
  activeWaffle,
  onWaffleClick,
}: CabinAreaProps) {
  const [floatingKos, setFloatingKos] = useState<FloatingKos[]>([]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onCabinClick();

    const rect = event.currentTarget.getBoundingClientRect();

    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;

    const randomX = (Math.random() - 0.5) * 18;
    const randomY = (Math.random() - 0.5) * 14;

    const newFloatingKos: FloatingKos = {
      id: Date.now() + Math.random(),
      x: clamp(clickX + randomX, 12, 88),
      y: clamp(clickY + randomY, 12, 82),
      amount: kosPerClick,
    };

    setFloatingKos((current) => [...current.slice(-20), newFloatingKos]);

    setTimeout(() => {
      setFloatingKos((current) =>
        current.filter((item) => item.id !== newFloatingKos.id),
      );
    }, 850);
  }

  return (
    <section className="cabin-area">
      <div className="cabin-click-zone">
        <img src={cabinImage} alt="Cozy cabin" className="cabin-image" />

        <button
          className="cabin-hotspot"
          onClick={handleClick}
          aria-label="Trykk på hytta"
        >
          {floatingKos.map((item) => (
            <span
              key={item.id}
              className="floating-kos"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              +{item.amount}
            </span>
          ))}

          {autoClickers.map((clicker) => (
            <span
              key={clicker.id}
              className="auto-clicker"
              style={{
                left: `${clicker.xPercent}%`,
                top: `${clicker.yPercent}%`,
              }}
              aria-hidden="true"
            >
              <img src={pointerIcon} alt="" className="auto-clicker__image" />
            </span>
          ))}

          <span className="hotspot-label" aria-hidden="true">
            <strong>Trykk på hytta</strong>
            <span>+{kosPerClick} Kos</span>
          </span>
        </button>
        {activeWaffle && (
          <button
            className="waffle-popup"
            type="button"
            onClick={onWaffleClick}
            style={{
              left: `${activeWaffle.xPercent}%`,
              top: `${activeWaffle.yPercent}%`,
            }}
            aria-label="Trykk på vaffelen"
          >
            <span className="waffle-popup__icon" aria-hidden="true">
              🧇
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
