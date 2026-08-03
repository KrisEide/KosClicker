import { useCallback, useRef, useState } from "react";
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
  newPermanentUpgradeIds: string[];
  onBuyPermanentUpgrade: (upgradeId: string) => void;
};

export function UpgradesPanel({
  upgrades,
  kos,
  onBuyUpgrade,
  showPermanentUpgrades,
  permanentUpgrades,
  newPermanentUpgradeIds,
  onBuyPermanentUpgrade,
}: UpgradesPanelProps) {
  const permanentListRef = useRef<HTMLDivElement | null>(null);
  const [hoveredPermanentUpgrade, setHoveredPermanentUpgrade] =
    useState<PermanentUpgrade | null>(null);
  const [permanentScrollHints, setPermanentScrollHints] = useState({
    top: false,
    bottom: false,
  });

  const availablePermanentUpgrades = permanentUpgrades.filter(
    (upgrade) => !upgrade.isOwned,
  );

  const updatePermanentScrollHints = useCallback(() => {
    const list = permanentListRef.current;

    if (!list) {
      return;
    }

    const nextHints = {
      top: list.scrollTop > 2,
      bottom: list.scrollTop + list.clientHeight < list.scrollHeight - 2,
    };

    setPermanentScrollHints((currentHints) =>
      currentHints.top === nextHints.top &&
      currentHints.bottom === nextHints.bottom
        ? currentHints
        : nextHints,
    );
  }, []);

  const setPermanentListNode = useCallback(
    (node: HTMLDivElement | null) => {
      permanentListRef.current = node;

      if (!node) {
        return;
      }

      if (availablePermanentUpgrades.length > 0) {
        requestAnimationFrame(updatePermanentScrollHints);
      }
    },
    [availablePermanentUpgrades.length, updatePermanentScrollHints],
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

          <div
            className={`permanent-list-shell ${
              permanentScrollHints.top
                ? "permanent-list-shell--more-above"
                : ""
            } ${
              permanentScrollHints.bottom
                ? "permanent-list-shell--more-below"
                : ""
            }`}
          >
            <div
              ref={setPermanentListNode}
              className="permanent-list"
              onScroll={updatePermanentScrollHints}
            >
              {availablePermanentUpgrades.map((upgrade) => {
                const canAfford = kos >= upgrade.cost;

                return (
                  <button
                    key={upgrade.id}
                    className="permanent-card"
                    type="button"
                    onClick={() => onBuyPermanentUpgrade(upgrade.id)}
                    onPointerEnter={() => setHoveredPermanentUpgrade(upgrade)}
                    onPointerLeave={() => setHoveredPermanentUpgrade(null)}
                    onFocus={() => setHoveredPermanentUpgrade(upgrade)}
                    onBlur={() => setHoveredPermanentUpgrade(null)}
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
                      <span className="permanent-name-line">
                        <span className="permanent-name">{upgrade.name}</span>
                        {newPermanentUpgradeIds.includes(upgrade.id) && (
                          <span className="permanent-new-badge">NY!</span>
                        )}
                      </span>
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
                        <span
                          className="permanent-cost__lock"
                          aria-hidden="true"
                        >
                          🔒
                        </span>
                      )}
                      {formatKos(upgrade.cost)} Kos
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {hoveredPermanentUpgrade && (
            <span className="permanent-tooltip permanent-tooltip--detached">
              <span className="permanent-tooltip__label">Full effekt</span>
              <span className="permanent-tooltip__effect">
                {hoveredPermanentUpgrade.effectText}
              </span>
              {hoveredPermanentUpgrade.flavorText && (
                <span className="permanent-tooltip__flavor">
                  “{hoveredPermanentUpgrade.flavorText}”
                </span>
              )}
            </span>
          )}
        </section>
      )}
    </aside>
  );
}
