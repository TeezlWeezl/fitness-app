import { Link } from "react-router-dom";

export function ActionCard(props) {
  if (props.type === "dashboard") {
    const { name, dayDue, duration, category, programId, workoutId } = props;
    return (
      <Link
        to={`programs/${programId}/${workoutId}`}
        className="mt-4 flex min-h-[214px] flex-col justify-end rounded-[30px] bg-app-medium p-7"
      >
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
  } else if (props.type === "progress") {
    const { name, dayDue, duration, category, programId, workoutId, completedWorkouts, totalWorkouts } = props;

    return (
      <div
        className={`mt-5 flex min-h-[${props.height}] flex-col items-center justify-center rounded-[30px] bg-app-medium first-of-type:mt-12 ${props.color} ${props.style}`}
      >
        <div className="ml flex min-w-full items-center justify-start gap-8">
          <div className="min-h-[62px] min-w-[62px] rounded-full bg-green-600"></div>
          <div className="flex flex-col gap-0">
            <p className="mtext">{name}</p>
            <p className="stext">{`${completedWorkouts} von ${totalWorkouts} geschafft`}</p>
          </div>
        </div>
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
