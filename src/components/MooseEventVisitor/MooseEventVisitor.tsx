import mooseEventImage from "../../assets/icons/elgevent.png";
import "./MooseEventVisitor.css";

type MooseEventVisitorProps = {
  durationSeconds: number;
};

export function MooseEventVisitor({
  durationSeconds,
}: MooseEventVisitorProps) {
  return (
    <div className="moose-event-visitor" aria-hidden="true">
      <img
        className="moose-event-visitor__image"
        src={mooseEventImage}
        alt=""
        style={{ animationDuration: `${durationSeconds}s` }}
      />
    </div>
  );
}
