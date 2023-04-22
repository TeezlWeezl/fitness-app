import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";
import "./Dashboard.style.css";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
      <h1 className="headline-1">Hi Name!</h1>
      <img src="../img/dashboard__workout.svg" className="m-auto my-6"></img>
      <div className="my-10 flex items-center justify-between">
        <h2 className="headline-2">Dein Workout heute</h2>
        <p className="stext">Trainingsplan</p>
      </div>
      <ActionCard type="dashboard" />

      <Navbar nav="home" />
    </div>
  );
}
