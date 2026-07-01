import "./TopBar.css";

type TopBarProps = {
  kos: number;
  kosPerSecond: number;
  onDebugAddKos: () => void;
  onDebugAutoClickBurst: () => void;
};

export function TopBar({
  kos,
  kosPerSecond,
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
        Kos: <span>{Math.floor(kos)}</span>
      </p>

      <p>
        Kos/sek: <span>{kosPerSecond.toFixed(1)}</span>
      </p>
    </header>
  );
}
