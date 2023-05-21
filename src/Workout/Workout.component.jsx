import { Link, useParams } from "react-router-dom";
import back from "../icon/back.svg";
import { ActionButton } from "../ActionButton";
import { useProgram } from "../hooks/usePrograms";
import { useWorkout } from "../hooks/useWorkouts";
import checkmark from "../icon/checkmark.svg";

function Workout(props) {
  const { programId, workoutId } = useParams();
  const { data, loading, error } = useWorkout(programId, workoutId);

  if (loading)
    return (
      <div className="app-default">
        <p className="mtext">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="app-default">
        <p className="mtext">Es ist ein Fehler aufgetreten</p>
        <p className="stext">{error}</p>
      </div>
    );

  if (data) {
    const {
      completed,
      dayDue,
      workout: { name, duration, category },
    } = data.program.programWorkoutSchedule[0];

    console.log(data.program.programWorkoutSchedule[0].workout.name);

    if (completed) {
      // Update with a not-completed page
      return (<div>Testing</div>);
    }

    return (
      <div className="app-default pt-0">
        <Link to={`/programs/${programId}`}>
          <img className="absolute right-5 top-5" src={back}></img>
        </Link>
        <p className="stext absolute left-[50%] top-6 translate-x-[-50%]">
          {name}
        </p>
        <div className="absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-7">
          <h1 className="headline-1">Tag {dayDue}</h1>
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
        </div>
        <div />
        <ActionButton color="redGradient">los!</ActionButton>
      </div>
    );
  }
}

export { Workout };
