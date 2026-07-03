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
      title: "KNITRENDE PEISKOS",
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

    moose: {
      title: "ELG UTENFOR",
      icon: "🫎",
      type: "positive",
      durationSeconds: 45,
      onlyAtNight: true,
      effectText: "+25% Kos/sek",
      effects: {
        kosPerSecondBonus: 0.25,
      },
      theme: {
        borderColor: "rgba(78, 117, 68, 0.3)",
        backgroundTop: "rgba(234, 244, 225, 0.97)",
        backgroundBottom: "rgba(214, 232, 202, 0.95)",
        iconTint: "rgba(211, 232, 195, 0.62)",
        textColor: "rgba(62, 98, 51, 0.9)",
        timerColor: "rgba(52, 82, 43, 0.88)",
        progressBackground: "rgba(62, 98, 51, 0.15)",
        progressStart: "rgba(76, 124, 58, 0.88)",
        progressEnd: "rgba(132, 176, 92, 0.95)",

        nightBorderColor: "rgba(132, 176, 92, 0.26)",
        nightBackgroundTop: "rgba(36, 55, 38, 0.97)",
        nightBackgroundBottom: "rgba(24, 39, 29, 0.96)",
      },
    },

    hikers: {
      title: "TURGÅERE PÅ TOMTA",
      icon: "🥾",
      type: "negative",
      durationSeconds: 30,
      effectText: "-500 Kos, -50% Kos/sek",
      flavorText:
        "Noen har bestemt at den raskeste veien til stien går rett over tomta di.",
      effects: {
        directKosChange: -500,
        kosPerSecondBonus: -0.5,
      },
      theme: {
        borderColor: "rgba(126, 91, 58, 0.3)",
        backgroundTop: "rgba(248, 235, 218, 0.97)",
        backgroundBottom: "rgba(232, 211, 188, 0.95)",
        iconTint: "rgba(230, 198, 164, 0.62)",
        textColor: "rgba(112, 75, 43, 0.9)",
        timerColor: "rgba(96, 62, 35, 0.88)",
        progressBackground: "rgba(112, 75, 43, 0.16)",
        progressStart: "rgba(135, 82, 39, 0.86)",
        progressEnd: "rgba(197, 137, 72, 0.95)",

        nightBorderColor: "rgba(176, 118, 72, 0.24)",
        nightBackgroundTop: "rgba(70, 47, 33, 0.97)",
        nightBackgroundBottom: "rgba(48, 35, 27, 0.96)",
      },
    },

    flies: {
      title: "FLUENE TAR OVER HYTTA",
      icon: "🪰",
      type: "negative",
      durationSeconds: 60,
      effectText: "-30% klikk, -30% Hyttehjelper",
      effects: {
        clickMultiplier: 0.7,
        helperMultiplier: 0.7,
      },
      theme: {
        borderColor: "rgba(112, 112, 50, 0.28)",
        backgroundTop: "rgba(247, 243, 210, 0.97)",
        backgroundBottom: "rgba(230, 224, 177, 0.95)",
        iconTint: "rgba(230, 222, 156, 0.62)",
        textColor: "rgba(98, 92, 38, 0.92)",
        timerColor: "rgba(82, 77, 31, 0.88)",
        progressBackground: "rgba(98, 92, 38, 0.16)",
        progressStart: "rgba(128, 118, 38, 0.86)",
        progressEnd: "rgba(198, 180, 64, 0.95)",

        nightBorderColor: "rgba(175, 160, 74, 0.24)",
        nightBackgroundTop: "rgba(62, 58, 31, 0.97)",
        nightBackgroundBottom: "rgba(42, 40, 25, 0.96)",
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
    cocoa: {
      cost: 4500,
    },

    marshmallows: {
      cost: 100000,
      cocoaClickBonusMultiplier: 1.5,
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
      baseMaxLevel: 10,
      cocoaMaxLevel: 10,

      clickBonusPerLevel: [
        1, 1, 1, 1, 1, 2, 2, 3, 4, 5,

        5, 6, 7, 8, 10, 12, 14, 17, 20, 25,
      ],

      levelCosts: [
        40, 60, 80, 100, 120, 170, 230, 370, 500, 1000,

        1400, 1900, 2600, 3600, 5000, 7000, 9500, 13000, 17500, 23500,
      ],
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
