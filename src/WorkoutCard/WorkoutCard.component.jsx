function WorkoutCard(props) {
  return (
    <div>
      <div
        className={`flex mt-4 ml-4 mr-6 min-h-[100px] rounded-[20px] bg-app-medium first-of-type:mt-5`}
      >
        <div className={`min-h-full bg-green-600 rounded-l-[20px] min-w-[100px] ${props.color}`} />
        <div className="py-3 px-3">
          <h3 className="headline-3">{props.children}</h3>
          <p className="stext mt-5">26 Min. ·</p>
          <p className="stext">Beweglichkeit </p>
        </div>
      </div>
    </div>
  );
}

export {WorkoutCard};
