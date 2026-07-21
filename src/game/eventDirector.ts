import { GAME_BALANCE } from "../data/gameBalance";

export type EventId = keyof typeof GAME_BALANCE.events;

type EventConfig = (typeof GAME_BALANCE.events)[EventId];

type GetRandomEventParams = {
  isNight: boolean;
  lastEventId: EventId | null;
  ownedPermanentUpgradeIds: string[];
};

function getRandomWeight(
  eventConfig: EventConfig,
  ownedPermanentUpgradeIds: string[],
) {
  if (!("randomWeight" in eventConfig)) {
    return 0;
  }

  let randomWeight = eventConfig.randomWeight;

  if ("randomWeightOverrides" in eventConfig) {
    const matchingOverride = eventConfig.randomWeightOverrides.find(
      (override) =>
        ownedPermanentUpgradeIds.includes(override.permanentUpgradeId),
    );

    if (matchingOverride) {
      randomWeight = matchingOverride.randomWeight;
    }
  }

  return randomWeight;
}

function getRequiredPermanentUpgradeId(eventConfig: EventConfig) {
  if (!("requiredPermanentUpgradeId" in eventConfig)) {
    return null;
  }

  return eventConfig.requiredPermanentUpgradeId;
}

function canOnlyStartAtNight(eventConfig: EventConfig) {
  if (!("onlyAtNight" in eventConfig)) {
    return false;
  }

  return eventConfig.onlyAtNight;
}

export function getRandomEventId({
  isNight,
  lastEventId,
  ownedPermanentUpgradeIds,
}: GetRandomEventParams): EventId | null {
  const availableEvents = Object.entries(GAME_BALANCE.events).filter(
    ([eventId, eventConfig]) => {
      if (eventId === lastEventId) {
        return false;
      }

      const randomWeight = getRandomWeight(
        eventConfig,
        ownedPermanentUpgradeIds,
      );

      if (randomWeight <= 0) {
        return false;
      }

      if (canOnlyStartAtNight(eventConfig) && !isNight) {
        return false;
      }

      const requiredPermanentUpgradeId =
        getRequiredPermanentUpgradeId(eventConfig);

      if (
        requiredPermanentUpgradeId &&
        !ownedPermanentUpgradeIds.includes(requiredPermanentUpgradeId)
      ) {
        return false;
      }

      return true;
    },
  );

  if (availableEvents.length === 0) {
    return null;
  }

  const totalWeight = availableEvents.reduce(
    (total, [, eventConfig]) =>
      total + getRandomWeight(eventConfig, ownedPermanentUpgradeIds),
    0,
  );

  let randomValue = Math.random() * totalWeight;

  for (const [eventId, eventConfig] of availableEvents) {
    randomValue -= getRandomWeight(eventConfig, ownedPermanentUpgradeIds);

    if (randomValue <= 0) {
      return eventId as EventId;
    }
  }

  return availableEvents[0][0] as EventId;
}
