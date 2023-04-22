import "./Dashboard.style.css";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-app-dark px-4 py-10">
        <h1 className="headline-1">Hi Name!</h1>
        <img src="../img/dashboard__workout.svg" className="m-auto my-6"></img>
        <div className="flex justify-between items-center my-10">
          <h2 className="headline-2">Dein Workout heute</h2>
          <p className="stext">Trainingsplan</p>
        </div>
    </div>
  );
}
