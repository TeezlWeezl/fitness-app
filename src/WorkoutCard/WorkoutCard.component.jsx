import checkmark from "../icon/checkmark.svg";
import "./WorkoutCard.style.css"

function WorkoutCard({ color, category, children, duration, dayDue, completed}) {
  return (
    <div>
      <div
        className={`ml-4 mr-6 mt-4 flex min-h-[100px] rounded-[20px] bg-app-medium first-of-type:mt-5`}
      >
        <div className={`min-h-full min-w-[100px] rounded-l-[20px] ${color}`} />
        <div className="flex flex-col justify-between px-3 py-3">
          <h3 className="headline-3">Tag {dayDue}</h3>
          <div>
            <p className="mtext italic">{children}</p>
            <p className="stext mt-0">
              {`${duration} Min. ·
              ${
                category === "weightTraining"
                  ? "Kraft"
                  : category === "mobility"
                  ? "Mobilität"
                  : category === "cardio"
                  ? "Cardio"
                  : "Koordination"
              }`}
            </p>
          </div>
        </div>
        <img className={`block w-10 ml-auto mr-3 ${completed && "checked"}`} src={checkmark} />
      </div>
    </div>
  );
}

export { WorkoutCard };
