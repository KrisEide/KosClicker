export type UpgradeUnlockStage = "start" | "afterCabinWarm" | "later";

export type Upgrade = {
  id: string;
  name: string;
  icon: string;
  iconSrc?: string;
  level: number;
  effectText: string;
  tooltipDetailText?: string;
  nextCost: number;
  maxLevel?: number;

  unlockStage: UpgradeUnlockStage;
  requiredUpgradeLevel?: {
    upgradeId: string;
    level: number;
  };
  requiredPermanentUpgradeId?: string;
  evolution?: {
    permanentUpgradeId: string;
    name: string;
    icon: string;
    iconSrc?: string;
    effectText: string;

    maxLevel: number;
    levelOffset: number;
    unlockNextCost: number;
  };
};

export type PermanentUpgrade = {
  id: string;
  name: string;
  icon: string;
  iconSrc?: string;
  cost: number;
  effectText: string;
  isOwned: boolean;
  requiredCompletedEventId?: string;
  unlockDelayAfterCompletedEventSeconds?: number;
  requiredUpgradeLevel?: {
    upgradeId: string;
    level: number;
  };
  unlocksUpgradeEvolutionId?: string;
  unlocksEventId?: string;
  flavorText?: string;
};

export type EventTheme = {
  borderColor: string;
  backgroundTop: string;
  backgroundBottom: string;
  iconTint: string;
  textColor: string;
  timerColor: string;
  progressBackground: string;
  progressStart: string;
  progressEnd: string;

  nightBorderColor?: string;
  nightBackgroundTop?: string;
  nightBackgroundBottom?: string;
};

export type GameEvent = {
  title: string;
  icon: string;
  type: "positive" | "negative";
  durationSeconds: number;
  effectText: string;
  flavorText?: string;

  randomWeight?: number;

  randomWeightOverrides?: readonly {
    permanentUpgradeId: string;
    randomWeight: number;
  }[];

  durationSecondsOverrides?: readonly {
    permanentUpgradeId: string;
    durationSeconds: number;
  }[];

  onlyAtNight?: boolean;
  requiredPermanentUpgradeId?: string;

  firstStartDelayAfterDaySeconds?: number;
  firstStartDelayAfterWaffleIronAppearsSeconds?: number;

  effects: {
    kosPerSecondBonus?: number;
    kosPerSecondMultiplier?: number;
    directKosChange?: number;
    clickMultiplier?: number;
    helperMultiplier?: number;

    kosPerSecondBonusByUpgradeLevel?: {
      upgradeId: string;
      levelOffset?: number;
      bonusByLevel: readonly number[];
      nightExtraBonusByLevel?: readonly number[];
    };
  };

  durationSecondsByUpgradeLevel?: {
    upgradeId: string;
    levelOffset?: number;
    secondsByLevel: readonly number[];
  };

  effectTextByUpgradeLevel?: {
    upgradeId: string;
    levelOffset?: number;
    dayTextByLevel: readonly string[];
    nightTextByLevel: readonly string[];
  };

  theme: EventTheme;
};
