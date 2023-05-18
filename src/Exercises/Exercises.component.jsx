import { Link, useParams } from "react-router-dom";
import { useExercises } from "../hooks/useExercises";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import closeIcon from "../icon/close.svg";
import prev from "../icon/Exercises__slider-prev.svg"
import next from "../icon/Exercises__slider-next.svg"
import "pure-react-carousel/dist/react-carousel.es.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Done!</div>;
  }

  return (
    <div className="timer">
      <div className="">Verbleibend</div>
      <div className="">{remainingTime}</div>
      <div className="">Sekunden</div>
    </div>
  );
};

function Exercises(props) {
  // extract the params from the url
  const { programId, workoutId } = useParams();
  // connect the useExercises hook
  const { error, data, loading } = useExercises(programId, workoutId);

  if (loading)
    <div className="app-default pt-0 text-white">
      <p className="mtext">Loading...</p>
    </div>;

  if (error)
    <div className="app-default">
      <p className="mtext">Es ist ein Fehler aufgetreten</p>
      <p className="stext">{error}</p>
    </div>;

  if (data) {
    const { color } = data.program;
    const {
      workout: { exercises },
    } = data.program.programWorkoutSchedule[0];
    return (
      <div className="">
        <div className="app-default min-w-full pt-0">
          <Link to={`/programs/${programId}/${workoutId}`}>
            <img
              src={closeIcon}
              alt="close"
              className="absolute right-5 top-5 w-4"
            />
          </Link>
          <div className="pt-[75px]">
            <div
              className={`min-h-[25px] max-w-[25px] rounded-full bg-green-300 ${color}`}
            ></div>
          </div>

          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={exercises.length}
          >
            <Slider>
              {exercises.map(({ id, duration, exercise: { name } }, index) => {
                console.log(name);
                return (
                  <Slide index={index} key={id}>
                    <div className="flex flex-col justify-center items-center text-center">
                      
                      <h1 className="headline-1 mt-[50%]">{name}</h1>
                    </div>
                  </Slide>
                );
              })}
            </Slider>
            <ButtonBack className="absolute top-[50%] translate-y-[-50%]">
              <div className="min-h-[100px] flex flex-row justify-center">
              <img src={prev} alt="previous" />
              </div>
            </ButtonBack>
            <ButtonNext className="absolute top-[50%] right-0 translate-y-[-50%]">
              <div className="min-h-[100px] flex flex-row justify-center">
              <img src={next} alt="next" />
              </div>
            </ButtonNext>
          </CarouselProvider>
        </div>
      </div>
    );
  }
}

export { Exercises };
