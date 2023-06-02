
const ProgressCircle = ({ index, currentSlide, color, exercisesFinished }) => {
  if (currentSlide === index) {
    /* Only show colored circle, if it is the current slide */
    return (
      <div
        className={`min-h-[25px] min-w-[25px] -translate-x-[20px] rounded-full border-none ${color}`}
      ></div>
    );
  } else if (exercisesFinished[index]) {
    return (
      <div
        className={`min-h-[25px] min-w-[25px] -translate-x-[20px] rounded-full border-none bg-green-500`}
      ></div>
    );
  } else
    return (
      <div
        className={`min-h-[25px] min-w-[25px] -translate-x-[20px] rounded-full border-[5px] border-app-medium`}
      ></div>
    );
};

export { ProgressCircle };
