import { Link } from "react-router-dom";

export function ActionCard(props) {
  if (props.type === "dashboard") {
    const { name, dayDue, duration, category, programId, workoutId } = props;
    return (
      <Link to={`programs/${programId}/${workoutId}`} className="flex min-h-[214px] flex-col justify-end rounded-[30px] bg-app-medium p-7 mt-4">
        <h3 className="headline-3">Tag {dayDue}</h3>
        <h2 className="headline-2">{name}</h2>
        <p className="stext">
          {duration} Min. ·{" "}
          {category === "weightTraining"
            ? "Kraft"
            : category === "mobility"
            ? "Mobilität"
            : category === "cardio"
            ? "Cardio"
            : "Koordination"}
        </p>
      </Link>
    );
  } else if (props.type === "program") {
    return (
      <div
        className={
          "flex min-h-[214px] flex-col items-center justify-center rounded-[30px] p-7 text-center " +
          props.color
        }
      >
        <h2 className="headline-2">{props.children}</h2>
      </div>
    );
  } else {
    return (
      <div
        className={`mt-5 flex min-h-[${props.height}] flex-col items-center justify-center rounded-[30px] bg-app-medium first-of-type:mt-12 ${props.color} ${props.style}`}
      >
        {props.children}
      </div>
    );
  }
}
