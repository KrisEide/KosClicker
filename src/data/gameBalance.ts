export const GAME_BALANCE = {
  debugKosAmount: 1000,

  warmCabinFireplaceLevel: 3,
  dayNightUnlockCandleLevel: 1,

  // rundt 100_00 virker bra her.
  phaseLengthMs: 110_000,
  nightBonus: 0.15,

  autoClickBurst: {
    count: 100,
    staggerMs: 360,
    visualDurationMs: 1400,

    xMinPercent: 4,
    xMaxPercent: 96,
    yMinPercent: 6,
    yMaxPercent: 90,
  },

  events: {
    rain: {
      title: "REGN UTE",
      icon: "🌧️",
      type: "positive",
      durationSeconds: 30,
      firstStartDelayAfterDaySeconds: 60,
      effectText: "+30% Kos/sek",
      effects: {
        kosPerSecondBonus: 0.3,
      },
      theme: {
        borderColor: "rgba(75, 125, 155, 0.26)",
        backgroundTop: "rgba(235, 246, 250, 0.97)",
        backgroundBottom: "rgba(217, 234, 242, 0.95)",
        iconTint: "rgba(222, 240, 248, 0.58)",
        textColor: "rgba(45, 95, 125, 0.85)",
        timerColor: "rgba(35, 80, 110, 0.82)",
        progressBackground: "rgba(45, 95, 125, 0.14)",
        progressStart: "rgba(45, 115, 155, 0.85)",
        progressEnd: "rgba(115, 180, 210, 0.95)",

        nightBorderColor: "rgba(150, 195, 220, 0.18)",
        nightBackgroundTop: "rgba(44, 64, 78, 0.97)",
        nightBackgroundBottom: "rgba(32, 48, 60, 0.96)",
      },
    },
  },

  // ----- PERMANENT UPGRADES -----
  permanentUpgrades: {
    storeWindows: {
      cost: 12000,
      rainKosPerSecondBonusIncrease: 0.3,
    },
    waffleIron: {
      cost: 4000,
      unlockDelayAfterRainSeconds: 30,
    },
  },

  // ---- NORMAL UPGRADES -----
  upgrades: {
    fireplace: {
      kosPerSecondPerLevel: 1,
      levelCosts: [15, 25, 45, 75, 120, 190, 300, 475, 750, 1200],
    },

    coffee: {
      clickBonusPerLevel: [1, 1, 1, 1, 1, 2, 2, 3, 4, 5],
      levelCosts: [40, 60, 80, 100, 120, 170, 230, 370, 500, 1000],
    },

    candle: {
      kosPerSecondPerLevel: 3,
      levelCosts: [90, 140, 220, 340, 520, 800, 1200, 1800, 2700, 4000],
    },
    cabinHelper: {
      levelCosts: [250, 400, 650, 1000, 1500, 2200, 3200, 4700, 6800, 9500],

      intervalMs: 2_000,

      clicksPerCycleByLevel: [0.6, 0.9, 1.3, 1.8, 2.4, 3.1, 3.9, 4.8, 5.8, 7],

      visualClicksPerCycleByLevel: [1, 2, 3, 3, 4, 5, 5, 6, 7, 8],

      level10ClickMultiplier: 2,
    },
    waffle: {
      levelCosts: [300, 500, 800, 1200, 1800, 2600, 3700, 5200, 7200, 10000],
    },
  },
} as const;
