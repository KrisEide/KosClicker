import "./EventCard.css";
import type { CSSProperties } from "react";

import kaldtIcon from "../../assets/icons/kaldt.png";

type EventTheme = {
  borderColor: string;
  backgroundTop: string;
  backgroundBottom: string;
  iconTint: string;
  textColor: string;
  timerColor: string;
  progressBackground: string;
  progressStart: string;
  progressEnd: string;
  nightBorderColor: string;
  nightBackgroundTop: string;
  nightBackgroundBottom: string;
};

type ActiveEvent = {
  type: "positive" | "negative";
  icon: string;
  title: string;
  effectText: string;
  timeRemaining: number;
  flavorText?: string;
  duration: number;
  theme: EventTheme;
};

type EventCardProps = {
  isCabinCold: boolean;
  activeEvent: ActiveEvent | null;
};

export function EventCard({ isCabinCold, activeEvent }: EventCardProps) {
  if (isCabinCold) {
    return (
      <section className="event-card event-card--cold">
        <div className="event-label">Hyttestatus</div>

        <div className="event-main event-main--cold">
          <span className="event-card__icon">
            <img
              className="event-card__icon-image event-card__icon-image--cold"
              src={kaldtIcon}
              alt=""
              aria-hidden="true"
            />
          </span>

          <div className="event-content">
            <h2>Hytta er iskald</h2>
            <p className="event-help">Kjøp Peis for å varme den opp.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!activeEvent) {
    return null;
  }

  const progressPercent =
    (activeEvent.timeRemaining / activeEvent.duration) * 100;

  const eventThemeStyle = {
    "--event-border-color": activeEvent.theme.borderColor,
    "--event-bg-top": activeEvent.theme.backgroundTop,
    "--event-bg-bottom": activeEvent.theme.backgroundBottom,
    "--event-icon-tint": activeEvent.theme.iconTint,
    "--event-text-color": activeEvent.theme.textColor,
    "--event-timer-color": activeEvent.theme.timerColor,
    "--event-progress-bg": activeEvent.theme.progressBackground,
    "--event-progress-start": activeEvent.theme.progressStart,
    "--event-progress-end": activeEvent.theme.progressEnd,
    "--event-night-border-color": activeEvent.theme.nightBorderColor,
    "--event-night-bg-top": activeEvent.theme.nightBackgroundTop,
    "--event-night-bg-bottom": activeEvent.theme.nightBackgroundBottom,
  } as CSSProperties;

  return (
    <section
      className={`event-card event-card--${activeEvent.type}`}
      style={eventThemeStyle}
    >
      <div className="event-label">Hyttestatus</div>

      <div className="event-main">
        <div className="event-icon">{activeEvent.icon}</div>

        <div className="event-content">
          <h2>{activeEvent.title}</h2>
          <p className="event-effect">{activeEvent.effectText}</p>
        </div>

        <div className="event-timer">
          <strong>{activeEvent.timeRemaining}s</strong>
          <span>igjen</span>
        </div>
      </div>

      <div className="event-progress">
        <div
          className="event-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
