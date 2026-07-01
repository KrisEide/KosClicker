import { useCallback, useEffect, useRef, useState } from "react";
import { CabinArea } from "./components/CabinArea/CabinArea";
import { CabinTraits } from "./components/CabinTraits/CabinTraits";
import { EventCard } from "./components/EventCard/EventCard";
import { TopBar } from "./components/TopBar/TopBar";
import { UpgradesPanel } from "./components/UpgradesPanel/UpgradesPanel";
import { startingUpgrades } from "./data/upgrades";
import { GAME_BALANCE } from "./data/gameBalance";
import { permanentUpgrades as startingPermanentUpgrades } from "./data/permanentUpgrades";
import "./App.css";

type EventId = keyof typeof GAME_BALANCE.events;

type IntroEventStep =
  | "waitingForFirstNight"
  | "waitingForDayAfterFirstNight"
  | "waitingForFirstRain"
  | "done";

type TimeOfDay = "day" | "night";

type AutoClicker = {
  id: number;
  xPercent: number;
  yPercent: number;
};

type ActiveWaffle = {
  id: number;
  xPercent: number;
  yPercent: number;
};

const WARM_CABIN_FIREPLACE_LEVEL = GAME_BALANCE.warmCabinFireplaceLevel;
const PHASE_LENGTH_MS = GAME_BALANCE.phaseLengthMs;
const NIGHT_BONUS = GAME_BALANCE.nightBonus;

function getNextUpgradeCost(upgradeId: string, nextLevel: number) {
  if (upgradeId === "fireplace") {
    return GAME_BALANCE.upgrades.fireplace.levelCosts[nextLevel] ?? null;
  }

  if (upgradeId === "coffee") {
    return GAME_BALANCE.upgrades.coffee.levelCosts[nextLevel] ?? null;
  }

  if (upgradeId === "candle") {
    return GAME_BALANCE.upgrades.candle.levelCosts[nextLevel] ?? null;
  }

  if (upgradeId === "cabinHelper") {
    return GAME_BALANCE.upgrades.cabinHelper.levelCosts[nextLevel] ?? null;
  }

  if (upgradeId === "waffle") {
    return GAME_BALANCE.upgrades.waffle.levelCosts[nextLevel] ?? null;
  }

  return null;
}

function getRandomPercent(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function App() {
  const [kos, setKos] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [upgrades, setUpgrades] = useState(startingUpgrades);

  const [permanentUpgrades, setPermanentUpgrades] = useState(
    startingPermanentUpgrades,
  );

  const [completedEventIds, setCompletedEventIds] = useState<EventId[]>([]);

  const [delayedPermanentUpgradeIds, setDelayedPermanentUpgradeIds] = useState<
    string[]
  >([]);

  const permanentUnlockTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scheduledPermanentUnlockIdsRef = useRef<string[]>([]);

  const [introEventStep, setIntroEventStep] = useState<IntroEventStep>(
    "waitingForFirstNight",
  );

  const [activeEventId, setActiveEventId] = useState<EventId | null>(null);
  const [eventTimeRemaining, setEventTimeRemaining] = useState(0);

  const [activeWaffle, setActiveWaffle] = useState<ActiveWaffle | null>(null);
  const [waffleBonusTimeRemaining, setWaffleBonusTimeRemaining] = useState(0);
  const nextWaffleIdRef = useRef(0);

  const [autoClickers, setAutoClickers] = useState<AutoClicker[]>([]);
  const autoClickTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextAutoClickerIdRef = useRef(0);

  function getUpgradeLevel(upgradeId: string) {
    return upgrades.find((upgrade) => upgrade.id === upgradeId)?.level ?? 0;
  }

  function isPermanentUpgradeOwned(upgradeId: string) {
    return (
      permanentUpgrades.find((upgrade) => upgrade.id === upgradeId)?.isOwned ??
      false
    );
  }

  const fireplaceLevel = getUpgradeLevel("fireplace");
  const coffeeLevel = getUpgradeLevel("coffee");
  const candleLevel = getUpgradeLevel("candle");
  const cabinHelperLevel = getUpgradeLevel("cabinHelper");
  const waffleLevel = getUpgradeLevel("waffle");
  const hasUnlockedDayNight =
    candleLevel >= GAME_BALANCE.dayNightUnlockCandleLevel;

  const isCabinCold = fireplaceLevel < WARM_CABIN_FIREPLACE_LEVEL;
  const isNight = timeOfDay === "night";

  const coffeeClickBonus = GAME_BALANCE.upgrades.coffee.clickBonusPerLevel
    .slice(0, coffeeLevel)
    .reduce((total, bonus) => total + bonus, 0);

  const cabinHelperClicksPerCycle =
    cabinHelperLevel > 0
      ? (GAME_BALANCE.upgrades.cabinHelper.clicksPerCycleByLevel[
          cabinHelperLevel - 1
        ] ?? 0)
      : 0;

  const cabinHelperVisualClicksPerCycle =
    cabinHelperLevel > 0
      ? (GAME_BALANCE.upgrades.cabinHelper.visualClicksPerCycleByLevel[
          cabinHelperLevel - 1
        ] ?? 0)
      : 0;

  const cabinHelperClickMultiplier =
    cabinHelperLevel >= 10
      ? GAME_BALANCE.upgrades.cabinHelper.level10ClickMultiplier
      : 1;

  const fireplaceKosPerSecond =
    fireplaceLevel * GAME_BALANCE.upgrades.fireplace.kosPerSecondPerLevel;

  const candleKosPerSecond =
    candleLevel * GAME_BALANCE.upgrades.candle.kosPerSecondPerLevel;

  const baseKosPerSecond = fireplaceKosPerSecond + candleKosPerSecond;

  const activeEventConfig = activeEventId
    ? GAME_BALANCE.events[activeEventId]
    : null;

  const storeWindowsRainBonus =
    activeEventId === "rain" && isPermanentUpgradeOwned("storeWindows")
      ? GAME_BALANCE.permanentUpgrades.storeWindows
          .rainKosPerSecondBonusIncrease
      : 0;

  const eventKosPerSecondBonus =
    (activeEventConfig?.effects.kosPerSecondBonus ?? 0) + storeWindowsRainBonus;

  const waffleKosPerSecondBonus =
    waffleBonusTimeRemaining > 0 && waffleLevel > 0
      ? (GAME_BALANCE.upgrades.waffle.kosPerSecondBonusByLevel[
          waffleLevel - 1
        ] ?? 0)
      : 0;

  const waffleClickBonusPercent =
    waffleBonusTimeRemaining > 0 && waffleLevel > 0
      ? (GAME_BALANCE.upgrades.waffle.clickBonusDuringEffectByLevel[
          waffleLevel - 1
        ] ?? 0)
      : 0;

  const totalKosPerSecondBonus =
    (isNight ? NIGHT_BONUS : 0) +
    eventKosPerSecondBonus +
    waffleKosPerSecondBonus;

  const kosPerSecond = baseKosPerSecond * (1 + totalKosPerSecondBonus);

  const visibleUpgrades = upgrades.filter((upgrade) => {
    if (isCabinCold) {
      return upgrade.unlockStage === "start";
    }

    const hasCorrectUnlockStage =
      upgrade.unlockStage === "start" ||
      upgrade.unlockStage === "afterCabinWarm";

    if (!hasCorrectUnlockStage) {
      return false;
    }

    if (upgrade.requiredUpgradeLevel) {
      const requiredLevel = getUpgradeLevel(
        upgrade.requiredUpgradeLevel.upgradeId,
      );

      if (requiredLevel < upgrade.requiredUpgradeLevel.level) {
        return false;
      }
    }

    if (upgrade.requiredPermanentUpgradeId) {
      if (!isPermanentUpgradeOwned(upgrade.requiredPermanentUpgradeId)) {
        return false;
      }
    }

    return true;
  });

  const baseKosPerClick = 1 + coffeeClickBonus;

  const kosPerClick = Math.round(
    baseKosPerClick * (1 + waffleClickBonusPercent),
  );

  const visiblePermanentUpgrades = permanentUpgrades.filter((upgrade) => {
    if (upgrade.requiredCompletedEventId) {
      const hasCompletedRequiredEvent = completedEventIds.includes(
        upgrade.requiredCompletedEventId as EventId,
      );

      if (!hasCompletedRequiredEvent) {
        return false;
      }
    }

    if (upgrade.unlockDelayAfterCompletedEventSeconds) {
      return delayedPermanentUpgradeIds.includes(upgrade.id);
    }

    return true;
  });

  function handleCabinClick() {
    setKos((currentKos) => currentKos + kosPerClick);
  }

  function handleWaffleClick() {
    if (!activeWaffle) return;

    setKos(
      (currentKos) => currentKos + GAME_BALANCE.upgrades.waffle.directKosReward,
    );

    setWaffleBonusTimeRemaining(
      GAME_BALANCE.upgrades.waffle.kosPerSecondBonusDurationSeconds,
    );

    setActiveWaffle(null);
  }

  // BARE FOR TESTING. SKAL FJERNES ----------------------------------------

  function handleDebugAddKos() {
    setKos((currentKos) => currentKos + GAME_BALANCE.debugKosAmount);
  }
  // BARE FOR TESTING. SKAL FJERNES ----------------------------------------

  const spawnAutoClickerVisual = useCallback(() => {
    const burstSettings = GAME_BALANCE.autoClickBurst;

    const clicker: AutoClicker = {
      id: nextAutoClickerIdRef.current,
      xPercent: getRandomPercent(
        burstSettings.xMinPercent,
        burstSettings.xMaxPercent,
      ),
      yPercent: getRandomPercent(
        burstSettings.yMinPercent,
        burstSettings.yMaxPercent,
      ),
    };

    nextAutoClickerIdRef.current += 1;

    setAutoClickers((currentClickers) => [...currentClickers, clicker]);

    const removeTimer = setTimeout(() => {
      setAutoClickers((currentClickers) =>
        currentClickers.filter(
          (currentClicker) => currentClicker.id !== clicker.id,
        ),
      );
    }, burstSettings.visualDurationMs);

    autoClickTimeoutsRef.current.push(removeTimer);
  }, []);

  const runAutoClickSequence = useCallback(
    (clickCount: number, kosPerAutoClick: number) => {
      const burstSettings = GAME_BALANCE.autoClickBurst;

      for (let index = 0; index < clickCount; index++) {
        const clickTimer = setTimeout(() => {
          spawnAutoClickerVisual();
          setKos((currentKos) => currentKos + kosPerAutoClick);
        }, index * burstSettings.staggerMs);

        autoClickTimeoutsRef.current.push(clickTimer);
      }
    },
    [spawnAutoClickerVisual],
  );

  function handleDebugAutoClickBurst() {
    runAutoClickSequence(GAME_BALANCE.autoClickBurst.count, kosPerClick);
  }

  function handleBuyUpgrade(upgradeId: string) {
    const upgrade = upgrades.find(
      (currentUpgrade) => currentUpgrade.id === upgradeId,
    );

    if (!upgrade) return;

    const isMaxLevel =
      upgrade.maxLevel !== undefined && upgrade.level >= upgrade.maxLevel;

    if (isMaxLevel) return;
    if (kos < upgrade.nextCost) return;

    setKos((currentKos) => currentKos - upgrade.nextCost);

    setUpgrades((currentUpgrades) =>
      currentUpgrades.map((currentUpgrade) => {
        if (currentUpgrade.id !== upgradeId) {
          return currentUpgrade;
        }

        return {
          ...currentUpgrade,
          level: currentUpgrade.level + 1,
          nextCost:
            getNextUpgradeCost(upgrade.id, upgrade.level + 1) ??
            upgrade.nextCost,
        };
      }),
    );
  }

  function handleBuyPermanentUpgrade(upgradeId: string) {
    const upgrade = permanentUpgrades.find(
      (currentUpgrade) => currentUpgrade.id === upgradeId,
    );

    if (!upgrade) return;
    if (upgrade.isOwned) return;
    if (kos < upgrade.cost) return;

    setKos((currentKos) => currentKos - upgrade.cost);

    setPermanentUpgrades((currentUpgrades) =>
      currentUpgrades.map((currentUpgrade) => {
        if (currentUpgrade.id !== upgradeId) {
          return currentUpgrade;
        }

        return {
          ...currentUpgrade,
          isOwned: true,
        };
      }),
    );
  }

  useEffect(() => {
    if (!hasUnlockedDayNight) return;

    const phaseTimer = setInterval(() => {
      setTimeOfDay((currentTime) => (currentTime === "day" ? "night" : "day"));
    }, PHASE_LENGTH_MS);

    return () => clearInterval(phaseTimer);
  }, [hasUnlockedDayNight]);

  useEffect(() => {
    if (kosPerSecond <= 0) return;

    const kosTimer = setInterval(() => {
      setKos((currentKos) => currentKos + kosPerSecond);
    }, 1000);

    return () => clearInterval(kosTimer);
  }, [kosPerSecond]);

  useEffect(() => {
    return () => {
      autoClickTimeoutsRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });

      permanentUnlockTimersRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  //Registrere første natt og første dag etter natt, for aktivering av første event.

  useEffect(() => {
    if (!hasUnlockedDayNight) return;

    if (introEventStep === "waitingForFirstNight" && timeOfDay === "night") {
      setIntroEventStep("waitingForDayAfterFirstNight");
      return;
    }

    if (
      introEventStep === "waitingForDayAfterFirstNight" &&
      timeOfDay === "day"
    ) {
      setIntroEventStep("waitingForFirstRain");
    }
  }, [hasUnlockedDayNight, timeOfDay, introEventStep]);

  useEffect(() => {
    if (introEventStep !== "waitingForFirstRain") return;
    if (activeEventId) return;

    const firstRainTimer = setTimeout(() => {
      setActiveEventId("rain");
      setEventTimeRemaining(GAME_BALANCE.events.rain.durationSeconds);
      setIntroEventStep("done");
    }, GAME_BALANCE.events.rain.firstStartDelayAfterDaySeconds * 1000);

    return () => clearTimeout(firstRainTimer);
  }, [introEventStep, activeEventId]);

  // ---------------- HYTTEHJELPER. Start

  useEffect(() => {
    if (cabinHelperLevel <= 0) return;
    if (cabinHelperClicksPerCycle <= 0) return;
    if (cabinHelperVisualClicksPerCycle <= 0) return;

    const helperTimer = setInterval(() => {
      const totalKosFromHelper =
        kosPerClick * cabinHelperClickMultiplier * cabinHelperClicksPerCycle;

      const kosPerVisualClick =
        totalKosFromHelper / cabinHelperVisualClicksPerCycle;

      runAutoClickSequence(cabinHelperVisualClicksPerCycle, kosPerVisualClick);
    }, GAME_BALANCE.upgrades.cabinHelper.intervalMs);

    return () => clearInterval(helperTimer);
  }, [
    cabinHelperLevel,
    cabinHelperClicksPerCycle,
    cabinHelperVisualClicksPerCycle,
    cabinHelperClickMultiplier,
    kosPerClick,
    runAutoClickSequence,
  ]);

  // -------------------- HYTTEHJELPER. End

  // -------------------- RANDOM VAFFEL TIMER. Start

  useEffect(() => {
    if (waffleLevel <= 0) return;
    if (activeWaffle) return;

    const minDelaySeconds =
      GAME_BALANCE.upgrades.waffle.minSpawnDelaySecondsByLevel[
        waffleLevel - 1
      ] ?? 60;

    const maxDelaySeconds =
      GAME_BALANCE.upgrades.waffle.maxSpawnDelaySecondsByLevel[
        waffleLevel - 1
      ] ?? 420;

    const randomDelaySeconds =
      Math.random() * (maxDelaySeconds - minDelaySeconds) + minDelaySeconds;

    const waffleSpawnTimer = setTimeout(() => {
      setActiveWaffle({
        id: nextWaffleIdRef.current,
        xPercent: getRandomPercent(
          GAME_BALANCE.upgrades.waffle.xMinPercent,
          GAME_BALANCE.upgrades.waffle.xMaxPercent,
        ),
        yPercent: getRandomPercent(
          GAME_BALANCE.upgrades.waffle.yMinPercent,
          GAME_BALANCE.upgrades.waffle.yMaxPercent,
        ),
      });

      nextWaffleIdRef.current += 1;
    }, randomDelaySeconds * 1000);

    return () => clearTimeout(waffleSpawnTimer);
  }, [waffleLevel, activeWaffle]);

  useEffect(() => {
    if (!activeWaffle) return;

    const waffleDespawnTimer = setTimeout(() => {
      setActiveWaffle(null);
    }, GAME_BALANCE.upgrades.waffle.visibleSeconds * 1000);

    return () => clearTimeout(waffleDespawnTimer);
  }, [activeWaffle]);

  useEffect(() => {
    if (waffleBonusTimeRemaining <= 0) return;

    const waffleBonusTimer = setTimeout(() => {
      setWaffleBonusTimeRemaining((currentTime) =>
        Math.max(currentTime - 1, 0),
      );
    }, 1000);

    return () => clearTimeout(waffleBonusTimer);
  }, [waffleBonusTimeRemaining]);

  // -------------------- RANDOM VAFFEL TIMER. End

  useEffect(() => {
    if (!activeEventId) return;

    if (eventTimeRemaining <= 0) {
      const completedEventId = activeEventId;

      setCompletedEventIds((currentEventIds) => {
        if (currentEventIds.includes(completedEventId)) {
          return currentEventIds;
        }

        return [...currentEventIds, completedEventId];
      });

      setActiveEventId(null);
      return;
    }

    const countdownTimer = setTimeout(() => {
      setEventTimeRemaining((currentTime) => Math.max(currentTime - 1, 0));
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [activeEventId, eventTimeRemaining]);

  // Delay for å unlocke nye upgrades
  useEffect(() => {
    permanentUpgrades.forEach((upgrade) => {
      if (!upgrade.requiredCompletedEventId) return;
      if (!upgrade.unlockDelayAfterCompletedEventSeconds) return;

      const hasCompletedRequiredEvent = completedEventIds.includes(
        upgrade.requiredCompletedEventId as EventId,
      );

      if (!hasCompletedRequiredEvent) return;

      const isAlreadyUnlocked = delayedPermanentUpgradeIds.includes(upgrade.id);
      if (isAlreadyUnlocked) return;

      const isAlreadyScheduled =
        scheduledPermanentUnlockIdsRef.current.includes(upgrade.id);

      if (isAlreadyScheduled) return;

      scheduledPermanentUnlockIdsRef.current.push(upgrade.id);

      const unlockTimer = setTimeout(() => {
        setDelayedPermanentUpgradeIds((currentIds) => {
          if (currentIds.includes(upgrade.id)) {
            return currentIds;
          }

          return [...currentIds, upgrade.id];
        });
      }, upgrade.unlockDelayAfterCompletedEventSeconds * 1000);

      permanentUnlockTimersRef.current.push(unlockTimer);
    });
  }, [completedEventIds, delayedPermanentUpgradeIds, permanentUpgrades]);

  const activeEvent = activeEventConfig
    ? {
        type: activeEventConfig.type,
        icon: activeEventConfig.icon,
        title: activeEventConfig.title,
        effectText: activeEventConfig.effectText,
        timeRemaining: eventTimeRemaining,
        duration: activeEventConfig.durationSeconds,
        theme: activeEventConfig.theme,
      }
    : null;

  return (
    <main
      className={`game game--${timeOfDay} ${
        waffleBonusTimeRemaining > 0 ? "game--waffle-bonus" : ""
      }`}
    >
      <TopBar
        kos={kos}
        kosPerSecond={kosPerSecond}
        onDebugAddKos={handleDebugAddKos}
        onDebugAutoClickBurst={handleDebugAutoClickBurst}
      />

      <section className="game-area">
        <div
          className={`day-night-indicator day-night-indicator--${timeOfDay}`}
        >
          {isNight
            ? `🌙 Nattbonus aktiv: +${NIGHT_BONUS * 100}% Kos/sek`
            : "☀️ Dagtid: normal kos"}
        </div>

        <section className="left-side">
          <CabinArea
            kosPerClick={kosPerClick}
            onCabinClick={handleCabinClick}
            autoClickers={autoClickers}
            activeWaffle={activeWaffle}
            onWaffleClick={handleWaffleClick}
          />

          <CabinTraits permanentUpgrades={permanentUpgrades} />

          <EventCard isCabinCold={isCabinCold} activeEvent={activeEvent} />
        </section>

        <UpgradesPanel
          upgrades={visibleUpgrades}
          kos={kos}
          onBuyUpgrade={handleBuyUpgrade}
          permanentUpgrades={visiblePermanentUpgrades}
          onBuyPermanentUpgrade={handleBuyPermanentUpgrade}
          showPermanentUpgrades={visiblePermanentUpgrades.length > 0}
        />
      </section>
    </main>
  );
}

export default App;
