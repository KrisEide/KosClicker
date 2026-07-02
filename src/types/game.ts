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
  evolution?: {
    permanentUpgradeId: string;
    name: string;
    icon: string;
    effectText: string;
    maxLevel: number;
    levelOffset: number;
  };
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
  requiredUpgradeLevel?: {
    upgradeId: string;
    level: number;
  };
  flavorText?: string;
};
