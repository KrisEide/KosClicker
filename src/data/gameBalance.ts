export const GAME_BALANCE = {
  debugKosAmount: 1000,

  warmCabinFireplaceLevel: 3,
  dayNightUnlockCandleLevel: 1,

  // rundt 100_00 virker bra her.
  //Hvor lenge natt og dag fasen varer
  phaseLengthMs: 60_000,
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
      durationSeconds: 40,
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
    neighborSmallTalk: {
      title: "NABOEN VIL SMÅPRATE",
      icon: "🧍",
      type: "negative",
      durationSeconds: 65,
      firstStartDelayAfterWaffleIronAppearsSeconds: 40,
      effectText: "-30% Kos/sek",
      flavorText:
        "Naboen har sett røyk fra pipa og vil bare slå av en liten prat. Det blir aldri en liten prat.",
      effects: {
        kosPerSecondBonus: -0.25,
      },
      theme: {
        borderColor: "rgba(130, 78, 48, 0.28)",
        backgroundTop: "rgba(252, 237, 220, 0.97)",
        backgroundBottom: "rgba(235, 213, 190, 0.95)",
        iconTint: "rgba(238, 205, 172, 0.62)",
        textColor: "rgba(118, 72, 42, 0.9)",
        timerColor: "rgba(105, 60, 35, 0.88)",
        progressBackground: "rgba(118, 72, 42, 0.16)",
        progressStart: "rgba(142, 77, 43, 0.85)",
        progressEnd: "rgba(205, 132, 74, 0.95)",

        nightBorderColor: "rgba(160, 105, 68, 0.24)",
        nightBackgroundTop: "rgba(69, 47, 36, 0.97)",
        nightBackgroundBottom: "rgba(48, 35, 28, 0.96)",
      },
    },
    cracklingBirchwood: {
      title: "KNITRENDE BJØRKEVED",
      icon: "🪵🔥",
      type: "positive",
      durationSeconds: 20,
      effectText: "+10% Kos/sek",
      effects: {
        kosPerSecondBonus: 0,
        kosPerSecondBonusByUpgradeLevel: {
          upgradeId: "fireplace",
          levelOffset: 10,
          bonusByLevel: [
            0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.2,
          ],
          nightExtraBonusByLevel: [
            0.05, 0.06, 0.07, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2,
          ],
        },
      },
      durationSecondsByUpgradeLevel: {
        upgradeId: "fireplace",
        levelOffset: 10,
        secondsByLevel: [20, 25, 30, 35, 40, 50, 60, 75, 90, 120],
      },
      effectTextByUpgradeLevel: {
        upgradeId: "fireplace",
        levelOffset: 10,
        dayTextByLevel: [
          "+10% Kos/sek",
          "+11% Kos/sek",
          "+12% Kos/sek",
          "+13% Kos/sek",
          "+14% Kos/sek",
          "+15% Kos/sek",
          "+16% Kos/sek",
          "+17% Kos/sek",
          "+18% Kos/sek",
          "+20% Kos/sek",
        ],
        nightTextByLevel: [
          "+15% Kos/sek (+5% natt)",
          "+17% Kos/sek (+6% natt)",
          "+19% Kos/sek (+7% natt)",
          "+21% Kos/sek (+8% natt)",
          "+24% Kos/sek (+10% natt)",
          "+27% Kos/sek (+12% natt)",
          "+30% Kos/sek (+14% natt)",
          "+33% Kos/sek (+16% natt)",
          "+36% Kos/sek (+18% natt)",
          "+40% Kos/sek (+20% natt)",
        ],
      },
      theme: {
        borderColor: "rgba(176, 92, 36, 0.3)",
        backgroundTop: "rgba(255, 239, 214, 0.98)",
        backgroundBottom: "rgba(239, 209, 174, 0.96)",
        iconTint: "rgba(255, 218, 158, 0.62)",
        textColor: "rgba(126, 68, 28, 0.9)",
        timerColor: "rgba(104, 54, 24, 0.88)",
        progressBackground: "rgba(126, 68, 28, 0.16)",
        progressStart: "rgba(180, 83, 32, 0.9)",
        progressEnd: "rgba(255, 174, 74, 0.95)",

        nightBorderColor: "rgba(255, 170, 80, 0.32)",
        nightBackgroundTop: "rgba(84, 47, 28, 0.98)",
        nightBackgroundBottom: "rgba(48, 31, 24, 0.96)",
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
    windowCandles: {
      cost: 10000,
    },
    largeFireplace: {
      cost: 9000,
      firstCracklingBirchwoodDelaySeconds: 45,
    },
  },

  // ---- NORMAL UPGRADES -----
  upgrades: {
    fireplace: {
      baseMaxLevel: 10,
      largeFireplaceMaxLevel: 10,

      kosPerSecondByLevel: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

        2, 2, 2, 2, 3, 3, 3, 4, 4, 5,
      ],

      levelCosts: [
        15, 25, 45, 75, 120, 190, 300, 475, 750, 1200,

        1800, 2600, 3800, 5500, 8000, 11500, 16500, 23500, 33500, 48000,
      ],
    },

    coffee: {
      clickBonusPerLevel: [1, 1, 1, 1, 1, 2, 2, 3, 4, 5],
      levelCosts: [40, 60, 80, 100, 120, 170, 230, 370, 500, 1000],
    },

    candle: {
      kosPerSecondPerLevel: 3,

      baseMaxLevel: 10,
      windowCandlesMaxLevel: 10,

      levelCosts: [
        90, 140, 220, 340, 520, 800, 1200, 1800, 2700, 4000,

        6000, 8500, 12000, 17000, 24000, 34000, 48000, 68000, 96000, 135000,
      ],

      windowCandlesNightBonusByLevel: [
        0.175, 0.2, 0.225, 0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4,
      ],
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

      minSpawnDelaySecondsByLevel: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60],

      maxSpawnDelaySecondsByLevel: [
        420, 390, 360, 330, 300, 280, 260, 250, 245, 240,
      ],

      visibleSeconds: 15,

      directKosReward: 500,

      kosPerSecondBonusDurationSeconds: 15,

      kosPerSecondBonusByLevel: [
        1, 1.15, 1.3, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3,
      ],

      clickBonusDuringEffectByLevel: [
        1, 1.15, 1.3, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3,
      ],

      helperFrenzyActualMultiplierByHelperLevel: [
        1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 10,
      ],

      helperFrenzyVisualExtraClicksByHelperLevel: [
        1, 2, 3, 4, 5, 6, 7, 8, 10, 12,
      ],

      xMinPercent: 28,
      xMaxPercent: 72,
      yMinPercent: 20,
      yMaxPercent: 62,
    },
  },
} as const;
