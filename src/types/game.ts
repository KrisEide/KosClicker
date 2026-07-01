export type UpgradeUnlockStage = "start" | "afterCabinWarm" | "later";

export type Upgrade = {
  id: string;
  name: string;
  icon: string;
  level: number;
  effectText: string;
  nextCost: number;
  maxLevel?: number;
  unlockStage: UpgradeUnlockStage;
  requiredUpgradeLevel?: {
    upgradeId: string;
    level: number;
  };
  requiredPermanentUpgradeId?: string;
};

export type PermanentUpgrade = {
  id: string;
  name: string;
  icon: string;
  cost: number;
  effectText: string;
  isOwned: boolean;
  requiredCompletedEventId?: string;
  unlockDelayAfterCompletedEventSeconds?: number;
  flavorText?: string;
};
