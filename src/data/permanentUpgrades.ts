import type { PermanentUpgrade } from "../types/game";

import { GAME_BALANCE } from "./gameBalance";

export const permanentUpgrades: PermanentUpgrade[] = [
  {
    id: "storeWindows",
    name: "Store vinduer",
    icon: "🪟",
    cost: GAME_BALANCE.permanentUpgrades.storeWindows.cost,
    effectText: "'Regn ute' bonus går fra +30% til +60% Kos/sek.",
    flavorText: "Jo større vinduer, jo mer kos blir det av dårlig vær.",
    isOwned: false,
    requiredCompletedEventId: "rain",
  },

  {
    id: "waffleIron",
    name: "Vaffeljern",
    icon: "🧇",
    cost: GAME_BALANCE.permanentUpgrades.waffleIron.cost,
    effectText: "Låser opp Vaffel i Oppgraderinger.",
    flavorText: "Ingenting sier hyttekos som lukten av nystekte vafler.",
    isOwned: false,
    requiredCompletedEventId: "rain",
    unlockDelayAfterCompletedEventSeconds:
      GAME_BALANCE.permanentUpgrades.waffleIron.unlockDelayAfterRainSeconds,
  },
  {
    id: "windowCandles",
    name: "Stearinlys i vinduskarmen",
    icon: "🌙",
    cost: GAME_BALANCE.permanentUpgrades.windowCandles.cost,
    effectText: "Oppgraderer stearinlys og gjør nattbonusen sterkere.",
    flavorText: "Et lite lys i vinduet gjør mørket utenfor hyggeligere.",
    isOwned: false,
    requiredUpgradeLevel: {
      upgradeId: "candle",
      level: 10,
    },
  },
];
