import type { Upgrade } from "../../types/game";
import "./UpgradeCard.css";

type UpgradeCardProps = {
  upgrade: Upgrade;
};

export function UpgradeCard({ upgrade }: UpgradeCardProps) {
  return (
    <article className="upgrade-card">
      <div className="upgrade-icon">{upgrade.icon}</div>

      <div className="upgrade-main">
        <h3>{upgrade.name}</h3>
        <p>{upgrade.nextCost} Kos</p>
      </div>

      <div className="upgrade-level">Lv. {upgrade.level}</div>
    </article>
  );
}
