import type { Upgrade } from "../types/game";
import { GAME_BALANCE } from "./gameBalance";

export const startingUpgrades: Upgrade[] = [
  {
    id: "fireplace",
    name: "Peis",
    icon: "🔥",
    level: 0,
    effectText: "+1 kos/sek",
    nextCost: GAME_BALANCE.upgrades.fireplace.levelCosts[0],
    maxLevel: 10,
    unlockStage: "start",
  },
  {
    id: "coffee",
    name: "Kaffe",
    icon: "☕",
    level: 0,
    effectText: "Klikk gir +1 Kos.",
    nextCost: GAME_BALANCE.upgrades.coffee.levelCosts[0],
    maxLevel: 10,
    unlockStage: "afterCabinWarm",
  },
  {
    id: "candle",
    name: "Stearinlys",
    icon: "🕯️",
    level: 0,
    effectText: "+3 Kos/sek.",
    nextCost: GAME_BALANCE.upgrades.candle.levelCosts[0],
    maxLevel: 10,
    unlockStage: "afterCabinWarm",
  },
  {
    id: "cabinHelper",
    name: "Hyttehjelper",
    icon: "🧍‍♂️",
    level: 0,
    effectText: "Klikker automatisk på hytta.",
    nextCost: GAME_BALANCE.upgrades.cabinHelper.levelCosts[0],
    maxLevel: 10,
    unlockStage: "afterCabinWarm",
    requiredUpgradeLevel: {
      upgradeId: "coffee",
      level: 5,
    },
  },

  {
    id: "waffle",
    name: "Vaffel",
    icon: "🧇",
    level: 0,
    effectText: "Øker sjansen for at Vaffel dukker opp på hytta.",
    nextCost: GAME_BALANCE.upgrades.waffle.levelCosts[0],
    maxLevel: 10,
    unlockStage: "afterCabinWarm",
    requiredPermanentUpgradeId: "waffleIron",
  },
];
