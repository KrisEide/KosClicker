import type { PermanentUpgrade, Upgrade } from "../../types/game";

import "./UpgradesPanel.css";

type UpgradesPanelProps = {
  upgrades: Upgrade[];
  kos: number;
  onBuyUpgrade: (upgradeId: string) => void;
  showPermanentUpgrades: boolean;
  permanentUpgrades: PermanentUpgrade[];
  onBuyPermanentUpgrade: (upgradeId: string) => void;
};

export function UpgradesPanel({
  upgrades,
  kos,
  onBuyUpgrade,
  showPermanentUpgrades,
  permanentUpgrades,
  onBuyPermanentUpgrade,
}: UpgradesPanelProps) {
  const availablePermanentUpgrades = permanentUpgrades.filter(
    (upgrade) => !upgrade.isOwned,
  );

  return (
    <aside className="upgrades-panel">
      <section className="menu-section">
        <h2 className="menu-title">Oppgraderinger</h2>

        <div className="upgrade-list">
          {upgrades.map((upgrade) => {
            const isMaxLevel =
              upgrade.maxLevel !== undefined &&
              upgrade.level >= upgrade.maxLevel;

            const canAfford = kos >= upgrade.nextCost;
            const isDisabled = isMaxLevel || !canAfford;

            return (
              <button
                key={upgrade.id}
                className={
                  upgrade.unlockStage === "afterCabinWarm"
                    ? "upgrade-row upgrade-row--new"
                    : "upgrade-row"
                }
                type="button"
                title={upgrade.effectText}
                disabled={isDisabled}
                onClick={() => onBuyUpgrade(upgrade.id)}
              >
                <span className="upgrade-icon">
                  {upgrade.iconSrc ? (
                    <img
                      className="upgrade-icon__image"
                      src={upgrade.iconSrc}
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    upgrade.icon
                  )}
                </span>

                <span className="upgrade-info">
                  <span className="upgrade-name">{upgrade.name}</span>
                  <span className="upgrade-cost">
                    {isMaxLevel ? "Maks nivå" : `${upgrade.nextCost} Kos`}
                  </span>
                </span>

                <span className="upgrade-level">Lv. {upgrade.level}</span>
                <span className="upgrade-tooltip">
                  <span className="upgrade-tooltip__label">Ved kjøp</span>
                  <span className="upgrade-tooltip__effect">
                    {upgrade.effectText}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {showPermanentUpgrades && (
        <section className="menu-section">
          <h2 className="menu-title">Hytteforbedringer</h2>

          <div className="permanent-grid">
            {availablePermanentUpgrades.map((upgrade) => (
              <button
                key={upgrade.id}
                className="permanent-card"
                type="button"
                onClick={() => onBuyPermanentUpgrade(upgrade.id)}
                disabled={upgrade.isOwned || kos < upgrade.cost}
              >
                <span className="permanent-icon">
                  {upgrade.iconSrc ? (
                    <img
                      className="permanent-icon__image"
                      src={upgrade.iconSrc}
                      alt=""
                      aria-hidden="true"
                    />
                  ) : (
                    upgrade.icon
                  )}
                </span>

                <span className="permanent-info">
                  <span className="permanent-name">{upgrade.name}</span>
                  <span className="permanent-cost">{upgrade.cost} Kos</span>
                </span>

                <span className="permanent-tooltip">
                  <span className="permanent-tooltip__title">
                    {upgrade.name}
                  </span>
                  <span className="permanent-tooltip__effect">
                    {upgrade.effectText}
                  </span>

                  {upgrade.flavorText && (
                    <span className="permanent-tooltip__flavor">
                      “{upgrade.flavorText}”
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
