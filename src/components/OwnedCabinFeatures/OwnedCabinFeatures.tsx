import type { PermanentUpgrade } from "../../types/game";
import "./OwnedCabinFeatures.css";

type OwnedCabinFeaturesProps = {
  features: PermanentUpgrade[];
};

export function OwnedCabinFeatures({ features }: OwnedCabinFeaturesProps) {
  return (
    <aside className="owned-cabin-features">
      <h3>Særpreg</h3>

      <div className="owned-feature-list">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="owned-feature"
            data-tooltip={`${feature.name}: ${feature.effectText}`}
            aria-label={`${feature.name}. ${feature.effectText}`}
          >
            {feature.icon}
          </div>
        ))}
      </div>
    </aside>
  );
}
