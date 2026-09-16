import { formatKos } from "../../utils/formatKos";
import "./TopBar.css";

type TopBarProps = {
  kos: number;
  kosPerSecond: number;
  showDebugControls: boolean;
  onDebugAddKos: () => void;
  onDebugAutoClickBurst: () => void;
  onDebugSpawnWaffle: () => void;
  kosPerSecondStatus: "normal" | "positive" | "negative";
  kosPerSecondStatusIcon?: string;
  kosPerSecondStatusIconSrc?: string;
};
export function TopBar({
  kos,
  kosPerSecond,
  showDebugControls,
  kosPerSecondStatus,
  kosPerSecondStatusIcon,
  kosPerSecondStatusIconSrc,
  onDebugAddKos,
  onDebugAutoClickBurst,
  onDebugSpawnWaffle,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="title-block">
        <h1>Kos Clicker</h1>
        <p className="game-credit">Et spill av Kristoffer Eide</p>
      </div>
      {showDebugControls && (
        <div className="debug-buttons">
          <button
            className="debug-kos-button"
            type="button"
            onClick={onDebugAddKos}
          >
            +1000 Kos
          </button>

          <button
            className="debug-kos-button"
            type="button"
            onClick={onDebugAutoClickBurst}
          >
            10 museklikk
          </button>

          <button
            className="debug-kos-button"
            type="button"
            onClick={onDebugSpawnWaffle}
          >
            Spawn vaffel
          </button>
        </div>
      )}

      <p>
        Kos: <span className="kos-value">{formatKos(kos)}</span>
      </p>

      <p className={`kos-per-second kos-per-second--${kosPerSecondStatus}`}>
        Kos/sek:{" "}
        <span className="kos-per-second__value">{kosPerSecond.toFixed(1)}</span>
        {(kosPerSecondStatusIconSrc || kosPerSecondStatusIcon) && (
          <span className="kos-per-second__event-icon" aria-hidden="true">
            {kosPerSecondStatusIconSrc ? (
              <img
                className="kos-per-second__event-icon-image"
                src={kosPerSecondStatusIconSrc}
                alt=""
              />
            ) : (
              kosPerSecondStatusIcon
            )}
          </span>
        )}
      </p>
    </header>
  );
}
