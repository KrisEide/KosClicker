import type { PermanentUpgrade } from "../types/game";
import storeVinduerIcon from "../assets/icons/store-vinduer.png";
import vaffelJernIcon from "../assets/icons/vaffeljern.png";

import { GAME_BALANCE } from "./gameBalance";

export const permanentUpgrades: PermanentUpgrade[] = [
  {
    id: "storeWindows",
    name: "Store vinduer",
    icon: "🪟",
    iconSrc: storeVinduerIcon,
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
    iconSrc: vaffelJernIcon,
    cost: GAME_BALANCE.permanentUpgrades.waffleIron.cost,
    effectText: "Låser opp Vaffel i Oppgraderinger.",
    flavorText: "Ingenting sier hyttekos som lukten av nystekte vafler.",
    isOwned: false,
    requiredCompletedEventId: "rain",
    unlockDelayAfterCompletedEventSeconds:
      GAME_BALANCE.permanentUpgrades.waffleIron.unlockDelayAfterRainSeconds,
  },

  {
    id: "screeningHedge",
    name: "hekk",
    icon: "🌿",
    cost: GAME_BALANCE.permanentUpgrades.screeningHedge.cost,
    effectText: "Naboen får ikke øye på deg like ofte.",
    flavorText: "Du er ikke interessert i å diskutere vedpriser med naboen.",
    isOwned: false,
    requiredCompletedEventId: "neighborSmallTalk",
  },

  {
    id: "windowCandles",
    name: "Vinduslys",
    icon: "🌙",
    cost: GAME_BALANCE.permanentUpgrades.windowCandles.cost,
    effectText: "Oppgraderer stearinlys og gjør nattbonusen sterkere.",
    flavorText: "Et lite lys i vinduet gjør mørket utenfor hyggeligere.",
    isOwned: false,
    requiredUpgradeLevel: {
      upgradeId: "candle",
      level: 10,
    },
    unlocksUpgradeEvolutionId: "candle",
  },

  {
    id: "largeFireplace",
    name: "Stor peis",
    icon: "♨️",
    cost: GAME_BALANCE.permanentUpgrades.largeFireplace.cost,
    effectText:
      "Peis blir til Stor peis og låser opp hendelsen 'Knitrende peiskos'",
    flavorText: "Det er plass til mer ved. Mye mer ved.",
    isOwned: false,
    requiredUpgradeLevel: {
      upgradeId: "fireplace",
      level: 10,
    },
    unlocksUpgradeEvolutionId: "fireplace",
    unlocksEventId: "cracklingBirchwood",
  },
  {
    id: "cocoa",
    name: "Kakao",
    icon: "🍫",
    cost: GAME_BALANCE.permanentUpgrades.cocoa.cost,
    effectText: "Kaffe blir til Kakao og kan oppgraderes videre.",
    flavorText: "Varm kakao gjør hytta enda lunere.",
    isOwned: false,
    requiredUpgradeLevel: {
      upgradeId: "coffee",
      level: 10,
    },
    unlocksUpgradeEvolutionId: "coffee",
  },
  {
    id: "marshmallows",
    name: "Marshmallows",
    icon: "☁️",
    cost: GAME_BALANCE.permanentUpgrades.marshmallows.cost,
    effectText: "Marshmallows gjør Kakaoens klikkbonus 50% sterkere.",
    flavorText: "Kakaoen er endelig komplett.",
    isOwned: false,
    requiredUpgradeLevel: {
      upgradeId: "coffee",
      level: 20,
    },
  },
];
