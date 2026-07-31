import type { PermanentUpgrade, Upgrade } from "../../types/game";
import { formatKos } from "../../utils/formatKos";

import "./UpgradesPanel.css";

const PERMANENT_UPGRADE_SUMMARIES: Record<string, string> = {
  storeWindows: "Dobler regnbonusen",
  waffleIron: "Låser opp Vaffel",
  screeningHedge: "Sjeldnere nabo",
  windowCandles: "Bedre nattbonus",
  largeFireplace: "Låser opp Stor peis",
  cocoa: "Låser opp Kakao",
  marshmallows: "Bedre Kakao-klikk",
  troll: "Ingen effekt",
  binoculars: "Bedre elgbonus",
};

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
                    {isMaxLevel
                      ? "Maks nivå"
                      : `${formatKos(upgrade.nextCost)} Kos`}
                  </span>
                </span>

                <span className="upgrade-level">Lv. {upgrade.level}</span>
                <span className="upgrade-tooltip">
                  <span className="upgrade-tooltip__label">Ved kjøp</span>
                  <span className="upgrade-tooltip__effect">
                    {upgrade.effectText}
                  </span>
                  {upgrade.tooltipDetailText && (
                    <span className="upgrade-tooltip__detail">
                      {upgrade.tooltipDetailText}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {showPermanentUpgrades && (
        <section className="menu-section menu-section--permanent">
          <header className="permanent-heading">
            <h2 className="menu-title permanent-title">Hytteforbedringer</h2>
            <p>Permanente forbedringer av hytta</p>
          </header>

          <div className="permanent-list">
            {availablePermanentUpgrades.map((upgrade) => {
              const canAfford = kos >= upgrade.cost;

              return (
                <button
                  key={upgrade.id}
                  className="permanent-card"
                  type="button"
                  onClick={() => onBuyPermanentUpgrade(upgrade.id)}
                  disabled={!canAfford}
                  aria-label={`${upgrade.name}. ${upgrade.effectText} ${formatKos(
                    upgrade.cost,
                  )} Kos`}
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
                    <span className="permanent-description">
                      {PERMANENT_UPGRADE_SUMMARIES[upgrade.id] ??
                        "Se full effekt"}
                    </span>
                  </span>

                  <span
                    className={`permanent-cost ${
                      canAfford ? "" : "permanent-cost--locked"
                    }`}
                  >
                    {!canAfford && (
                      <span className="permanent-cost__lock" aria-hidden="true">
                        🔒
                      </span>
                    )}
                    {formatKos(upgrade.cost)} Kos
                  </span>

                  <span className="permanent-tooltip">
                    <span className="permanent-tooltip__label">Full effekt</span>
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
              );
            })}
          </div>
        </section>
      )}
    </aside>
  );
}
