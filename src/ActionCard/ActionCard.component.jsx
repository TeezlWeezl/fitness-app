import { Link } from "react-router-dom";

import "./ActrionCard.style.scss";

export function ActionCard(props) {

  const gradientColors = {
    redGradient: "#FFD162" ,
    greenGradient: "#3EF3E8",
    blueGradient: "#3A4AE4"
  }

  if (props.type === "dashboard") {
    const { name, dayDue, duration, category, programId, workoutId } = props;
    return (
      <Link
        to={`programs/${programId}/${workoutId}`}
        className="shadow-md shadow-black mt-4 flex min-h-[214px] flex-col justify-end rounded-[30px] bg-app-medium p-7"
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
    const {
      name,
      dayDue,
      duration,
      category,
      programId,
      workoutId,
      completedWorkouts,
      totalWorkouts,
      color,
    } = props;

    return (
      <div
        className={`shadow-md shadow-black mt-4 flex max-h-[120px] min-h-[120px] flex-col items-center justify-center rounded-[30px] bg-app-medium pl-6`}
      >
        <div className="flex min-w-full items-center justify-start gap-8">
          <div
            className="pie"
            style={{
              "--percentage": (completedWorkouts / totalWorkouts) * 100,
              "--borderThickness": 15 + "px",
              "--mainColor": gradientColors[color],
            }}
          >
            <div className="mtext z-10 text-lg">{`${
              ((completedWorkouts / totalWorkouts) * 100).toFixed(0)
            } %`}</div>
          </div>
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
