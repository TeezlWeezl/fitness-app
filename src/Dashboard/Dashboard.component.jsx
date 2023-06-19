import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";
import { useActivePrograms } from "../hooks/usePrograms";

import "./Dashboard.style.css";
import workoutImg from "../img/dashboard__workout.svg";

export function Dashboard() {
  const { data, loading, error } = useActivePrograms({useCase: 'dashboard'});

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  if (data) {
    const programs = data.programs;
    // const { programs: [{color, id, name, programWorkoutSchedule: [{dayDue, duration}]}] } = data;

    return (
      <div className="app-default">
        <h1 className="headline-1">Hi Name!</h1>
        <img src={workoutImg} className="m-auto my-6"></img>
        <div className="my-10 flex items-center justify-between">
          <h2 className="headline-2">Dein Workout heute</h2>
          <p className="stext">Trainingsplan</p>
        </div>
        {programs.map(
          ({
            color,
            id: programId,
            name,
            programWorkoutSchedule: [
              {
                id: workoutId,
                dayDue,
                workout: { duration, category },
              },
            ],
          }) => {
            return (
              <ActionCard
                key={programId}
                type="dashboard"
                color={color}
                name={name}
                dayDue={dayDue}
                duration={duration}
                category={category}
                programId={programId}
                workoutId={workoutId}
              >
                {name}
              </ActionCard>
            );
          }
        )}
        <Navbar nav="home" />
      </div>
    );
  }
}
