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
import { useState } from "react";

import closeIcon from "../icon/close.svg";
import prev from "../icon/Exercises__slider-prev.svg";
import next from "../icon/Exercises__slider-next.svg";
import "pure-react-carousel/dist/react-carousel.es.css";

const renderTime = ({ remainingTime }) => {
  // if (remainingTime === startTime) {
  //   return <div className="mtext">Klicken zum starten!</div>;
  // }

  if (remainingTime === 0) {
    return <div className="mtext">Done!</div>;
  }

  return (
    <div>
      <div className="mtext">Verbleibend</div>
      <div className="mtext text-3xl">{remainingTime}</div>
      <div className="mtext">Sekunden</div>
    </div>
  );
};

function Exercises(props) {
  // extract the params from the url
  const { programId, workoutId } = useParams();
  // connect the useExercises hook
  const { error, data, loading } = useExercises(programId, workoutId);
  // add state for start and stopping the timer
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading)
    <div className="app-default">
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
        <div className="app-default min-w-full p-0">
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
            className="translate-y-[-50%] absolute top-[50%] w-full"
          >
            <Slider>
              {exercises.map(({ id, duration, exercise: { name } }, index) => {
                return (
                  <Slide index={index} key={id}>
                    <div className="flex min-h-full flex-col items-center justify-start gap-8 text-center mt-[90px]">
                      <button onClick={() => setIsPlaying((prev) => !prev)}>
                        <CountdownCircleTimer
                          trailColor="#4D5059"
                          trailStrokeWidth={18}
                          strokeWidth={18}
                          isPlaying={isPlaying}
                          duration={duration}
                          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                          colorsTime={[
                            duration,
                            (duration * 2) / 3,
                            (duration * 1) / 3,
                            0,
                          ]}
                          onComplete={() => ({ shouldRepeat: false })}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      </button>
                      <h1 className="headline-1">{name}</h1>
                    </div>
                  </Slide>
                );
              })}
            </Slider>
            <ButtonBack className="w-16 absolute top-[50%] min-h-full translate-y-[-50%]">
              <div className="flex min-h-[100px] flex-row justify-center">
                <img src={prev} alt="previous" />
              </div>
            </ButtonBack>
            <ButtonNext className="w-16 absolute top-[50%] min-h-full translate-y-[-50%] right-0">
              <div className="flex min-h-[100px] flex-row justify-center">
                <img src={next} alt="next" />
              </div>
            </ButtonNext>
          </CarouselProvider>
        </div>
    );
  }
}

export { Exercises };
