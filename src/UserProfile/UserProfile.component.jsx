import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";
import { useProgramsStats } from "../hooks/usePrograms";

const UserProfile = () => {
  const { data, loading, error } = useProgramsStats();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    const programs = data.programs;

    return (
      <div className="app-default">
        <h2 className="headline-2">Name</h2>
        <div className=" mt-[85px] flex flex-col items-center justify-center gap-3">
          <div className="blueGradient min-h-[120px] min-w-[120px] rounded-full"></div>
          <p className="mtext">Profil bearbeiten</p>
        </div>
        <p className="mtext mt-9">Aktueller Trainingsplan</p>
        {programs.map(
          ({
            color,
            id: programId,
            name,
            programWorkoutSchedule,
          }) => {
            let totalWorkouts = programWorkoutSchedule.length;
            let completedWorkouts = programWorkoutSchedule.filter(({completed}) => completed === true).length;

            return (
              <ActionCard
                key={programId}
                height="120px"
                color="bg-app-medium"
                type="progress"
                style="mt-2 pl-6"
                name={name}
                completedWorkouts={completedWorkouts}
                totalWorkouts={totalWorkouts}
              ></ActionCard>
            );
          }
        )}

        <Navbar nav="profile" />
      </div>
    );
  }
};

export { UserProfile };
