function WorkoutCard({ color, category, children, duration, dayDue }) {
  return (
    <div>
      <div
        className={`ml-4 mr-6 mt-4 flex min-h-[100px] rounded-[20px] bg-app-medium first-of-type:mt-5`}
      >
        <div className={`min-h-full min-w-[100px] rounded-l-[20px] ${color}`} />
        <div className="px-3 py-3 flex flex-col justify-between">
          <h3 className="headline-3">Tag {dayDue}</h3>
          <div>
            <p className="mtext italic">{children}</p>
            <p className="stext mt-0">
              {`${duration} Min. ·
              ${category === "weightTraining"
                ? "Kraft"
                : category === "mobility"
                ? "Mobilität"
                : category === "cardio"
                ? "Cardio"
                : "Koordination"}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WorkoutCard };
