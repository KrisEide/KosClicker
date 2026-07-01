import type { PermanentUpgrade } from "../../types/game";
import "./CabinTraits.css";

const MAX_VISIBLE_TRAITS = 12;

type CabinTraitsProps = {
  permanentUpgrades: PermanentUpgrade[];
};

export function CabinTraits({ permanentUpgrades }: CabinTraitsProps) {
  const ownedTraits = permanentUpgrades
    .filter((upgrade) => upgrade.isOwned)
    .slice(0, MAX_VISIBLE_TRAITS);

  if (ownedTraits.length === 0) {
    return null;
  }

  return (
    <section className="cabin-traits" aria-label="Hyttas særpreg">
      <h2>Hyttens særpreg</h2>

      <div className="cabin-traits__list">
        {ownedTraits.map((upgrade) => (
          <div
            key={upgrade.id}
            className="cabin-traits__item"
            title={upgrade.effectText}
          >
            <span className="cabin-traits__icon">{upgrade.icon}</span>
            <span className="cabin-traits__name">{upgrade.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
