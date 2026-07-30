import "./TopBar.css";

type TopBarProps = {
  kos: number;
  kosPerSecond: number;
  onDebugAddKos: () => void;
  onDebugAutoClickBurst: () => void;
  kosPerSecondStatus: "normal" | "positive" | "negative";
  kosPerSecondStatusIcon?: string;
};
export function TopBar({
  kos,
  kosPerSecond,
  kosPerSecondStatus,
  kosPerSecondStatusIcon,
  onDebugAddKos,
  onDebugAutoClickBurst,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="title-block">
        <h1>Kos Clicker</h1>
      </div>
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
      </div>

      <p>
        Kos: <span className="kos-value">{Math.floor(kos)}</span>
      </p>

      <p className={`kos-per-second kos-per-second--${kosPerSecondStatus}`}>
        Kos/sek:{" "}
        <span className="kos-per-second__value">{kosPerSecond.toFixed(1)}</span>
        {kosPerSecondStatusIcon && (
          <span className="kos-per-second__event-icon" aria-hidden="true">
            {kosPerSecondStatusIcon}
          </span>
        )}
      </p>
    </header>
  );
}
