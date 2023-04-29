import { useParams } from "react-router-dom";
import { ActionButton } from "../ActionButton";
import { WorkoutCard } from "../WorkoutCard";
import { useProgram } from "../hooks/usePrograms";
import { useEffect, useState } from "react";

function Program(props) {
  const { programId } = useParams();
  const { error, data, loading } = useProgram(programId);

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
    const { id, name, description, focus, difficulty, duration, color } = data.program;
    return (
      <div className="app-default pb-24 pl-0 pr-0 pt-0">
        <div className={`relative flex min-h-[75vh] flex-col justify-center ${color}`}>
          <h1 className="headline-1 pl-9 pr-9 text-center">{name}</h1>
          <div className="absolute bottom-4 flex min-w-full justify-between pl-9 pr-9">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">{
                focus === "weightTraining" ? "Kraft" 
                : focus === "mobility" ? "Mobilität"
                : focus === "cardio" ? "Cardio"
                : "Koordination"
              }</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">{
                difficulty === "easy" ? "Leicht"
                : difficulty === "moderate" ? "Mittel"
                : "Schwer"
              }</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
              <p className="stext">{
                `${duration} Wochen`
              }</p>
            </div>
          </div>
        </div>
        <div className="bg-app-medium px-6 py-5 ">
          <p className="mtext">{description}</p>
        </div>
        <div className="my-7 px-6">
          <h3 className="headline-3">So ist das Programm aufgeteilt:</h3>
        </div>
        <div className="mt-7 flex justify-between px-6">
          <h3 className="headline-3">21 Tage</h3>
          <p className="stext">Alle anzeigen</p>
        </div>
        <WorkoutCard color="redGradient">Tag 1</WorkoutCard>
        <WorkoutCard color="greenGradient">Tag 2</WorkoutCard>
        <WorkoutCard color="blueGradient">Tag 3</WorkoutCard>

        <ActionButton color="redGradient" size="145px">
          jetzt starten
        </ActionButton>
      </div>
    );
  }
}

export { Program };
