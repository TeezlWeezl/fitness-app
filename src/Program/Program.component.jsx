import { Link, useNavigate, useParams } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import { WorkoutCard } from "../WorkoutCard";
import { useProgram } from "../hooks/usePrograms";
import { useEffect, useState } from "react";

import close from "../icon/close.svg";
import { useUpdateWorkoutCompleted } from "../hooks/useUpdateWorkoutFinished";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";

const calculatePieChartObj = (arr) => {
  const colorCodes = ["#E38627", "#C13C37", "#6A2135", "#5158F6"];
  let storage = [];
  arr.forEach((item) => {
    if (!storage.map((e) => e.title).includes(item)) {
      storage.push({ title: item, value: 1 });
    } else {
      storage.forEach((e) => {
        if (e.title == item) {
          e.value += 1;
          return;
        }
      });
    }
  });
  storage.forEach((e, i) => (e.color = colorCodes[i]));
  return storage;
};

function Program(props) {
  const [offset, setOffset] = useState(0);
  const { programId } = useParams();
  const { error, data, loading, fetchMore } = useProgram({
    id: programId,
    skip: 0,
    first: 3,
    onCompleted: () => {
      setOffset((prev) => prev + 3);
    },
  });
  const navigate = useNavigate();
  // const {updateAndPublishWorkoutCompleted, loading: loadingTest, error: errorTest, data: dataTest} = useUpdateWorkoutCompleted()
  const categoryMapping = {
    weightTraining: "Kraft",
    mobility: "Mobilität",
    cardio: "Cardio",
    coordination: "Koordination",
  };

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
      name,
      description,
      focus,
      difficulty,
      durationWeeks,
      durationDays,
      color,
      programWorkoutSchedule,
    } = data.program;

    const workoutLayout = programWorkoutSchedule.map(
      (day) => categoryMapping[day.workout.category]
    );

    console.log(workoutLayout);

    return (
      <div className="app-default pb-24 pl-0 pr-0 pt-0">
        <Link to="/programs">
          <img className="absolute right-5 top-5 z-10" src={close}></img>
        </Link>
        <div
          className={`relative flex min-h-[75vh] flex-col justify-center ${color}`}
        >
          <h1 className="headline-1 pl-9 pr-9 text-center">{name}</h1>
          <div className="absolute bottom-4 flex min-w-full justify-between pl-9 pr-9">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">
                {focus === "weightTraining"
                  ? "Kraft"
                  : focus === "mobility"
                  ? "Mobilität"
                  : focus === "cardio"
                  ? "Cardio"
                  : "Koordination"}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">
                {difficulty === "easy"
                  ? "Leicht"
                  : difficulty === "moderate"
                  ? "Mittel"
                  : "Schwer"}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">{`${durationWeeks} Wochen`}</p>
            </div>
          </div>
        </div>
        <div className="bg-app-medium px-6 py-5 ">
          <p className="mtext">{description}</p>
        </div>
        <div className="my-7 px-6">
          <h3 className="headline-3">So ist das Programm aufgeteilt:</h3>
          <PieChart
            data={calculatePieChartObj(workoutLayout)}
            style={{ height: "250px" }}
            radius={pieChartDefaultProps.radius - 14}
            segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
            label={({ dataEntry }) => {
              const percentage = Math.round(dataEntry.percentage) + "%";
              const title = dataEntry.title;
              return title + '\n' + percentage;
            }}
            labelStyle={{
              fontSize: "8px",
              fontFamily: "sans-serif",
              fill: "white",
            }}
            lineWidth={60}
            labelPosition={112}
          />
        </div>
        <div className="mt-7 flex items-center justify-between px-6">
          <h3 id="workoutSchedule" className="headline-3">
            {durationDays} Tage
          </h3>
          <button
            className="stext"
            onClick={() => {
              fetchMore({ variables: { skip: offset } });
            }}
          >
            Alle anzeigen
          </button>
        </div>
        {programWorkoutSchedule.map(
          ({
            id,
            dayDue,
            completed,
            workout: { id: workoutId, category, workoutColor, duration, name },
          }) => (
            <Link key={id} to={`${id}`}>
              <WorkoutCard
                color={workoutColor}
                category={category}
                duration={duration}
                dayDue={dayDue}
                completed={completed}
              >
                {name}
              </WorkoutCard>
            </Link>
          )
        )}

        <ActionButton
          color={color}
          size="145px"
          onClick={() => {
            // updateAndPublishWorkoutCompleted({
            //   programId: "cl27m0xd399qr0cun5o69zb35",
            //   workoutId: "clh95a1xzz9p40buuox30x6dx",
            //   completed: false
            // })

            for (const { completed, id } of programWorkoutSchedule) {
              if (!completed) {
                navigate(id);
                return;
              }
            }
          }}
        >
          jetzt starten
        </ActionButton>
      </div>
    );
  }
}

export { Program };
