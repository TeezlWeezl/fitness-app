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
import { useEffect, useState } from "react";
import { ActionButton } from "../ActionButton";

import closeIcon from "../icon/close.svg";
import prev from "../icon/Exercises__slider-prev.svg";
import next from "../icon/Exercises__slider-next.svg";
import info from "../icon/Exercises__info.svg";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Exercises.style.css";

const renderTime = ({ remainingTime }) => {
  // if (remainingTime === startTime) {
  //   return <div className="mtext">Klicken zum starten!</div>;
  // }

  if (remainingTime === 0) {
    return <div className="mtext text-3xl">Fertig</div>;
  }

  return (
    <div>
      <div className="mtext">Verbleibend</div>
      <div className="mtext text-3xl">{remainingTime}</div>
      <div className="mtext">Sekunden</div>
    </div>
  );
};

const renderSlide = ({
  index,
  id,
  type,
  name,
  duration,
  reps,
  description,
  isPlaying,
  setIsPlaying,
}) => {
  let exerciseContainer;

  if (type === "duration") {
    exerciseContainer = (
      <div className="min-h-full">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="headline-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <CountdownCircleTimer
            trailColor="#4D5059"
            trailStrokeWidth={18}
            strokeWidth={18}
            isPlaying={isPlaying}
            duration={duration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[duration, (duration * 2) / 3, (duration * 1) / 3, 0]}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </button>
        <h1 className="headline-1 absolute bottom-[30%] left-[50%] translate-x-[-50%] text-center">
          {name}
        </h1>
      </div>
    );
  }

  if (type === "reps") {
    exerciseContainer = (
      <div className="min-h-full">
        <h1 className="headline-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          {reps} x
        </h1>
        <h1 className="headline-1 absolute bottom-[30%] left-[50%] translate-x-[-50%] text-center">
          {name}
        </h1>
      </div>
    );
  }

  return (
    <Slide index={index} key={id}>
      {exerciseContainer}
      {
        /* Show a description info box if there is one 
        7a167e8e-594a-42a1-b062-57ddda7876a8 */
        description && (
          <button
            tabIndex="1"
            className="absolute left-0 top-[90%] h-[80vh] w-full rounded-t-[30px] bg-app-medium transition-all"
            onClick={(e) => {
              e.target.classList.remove("top-[90%]");
              e.target.classList.add("top-[20%]");
              for (const el of document.getElementsByClassName(
                "slide-buttons"
              )) {
                el.classList.add("hidden");
                el.classList.remove("block");
              }
            }}
          >
            <div className="absolute right-4 top-4 flex min-h-[35px] min-w-[35px] justify-center rounded-full bg-app-dark">
              <img src={info} alt="exercise info" />
            </div>
            <div className="absolute bottom-3 min-h-[92%] p-9 text-left">
              <h1 className="headline-1">{name}</h1>
              <p className="mtext mt-5">{description}</p>
            </div>
            <ActionButton
              className="absolute text-white bottom"
              color="bg-app-dark"
              onClick={(e) => {
                e.target.parentElement.classList.remove("top-[20%]");
                e.target.parentElement.classList.add("top-[90%]");
                for (const el of document.getElementsByClassName("slide-buttons")) {
                  el.classList.add("block");
                  el.classList.remove("hidden");
                }
              }}
            >
              ok!
            </ActionButton>
          </button>
        )
      }
    </Slide>
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
            className="absolute right-5 top-5 z-10 w-4"
          />
        </Link>
        <div className="pt-[75px]">
          <div
            className={`min-h-[25px] max-w-[25px] rounded-full ${color}`}
          ></div>
        </div>

        <CarouselProvider
          naturalSlideWidth={
            /* Use the windows innerWidth and innerHeight for the aspect ratio of each slide */
            window.innerWidth
          }
          naturalSlideHeight={window.innerHeight}
          totalSlides={exercises.length}
          className="absolute top-0 w-full"
        >
          <Slider>
            {exercises.map(
              (
                { id, duration, reps, exercise: { type, name, description } },
                index
              ) => {
                return renderSlide({
                  index,
                  id,
                  type,
                  name,
                  duration,
                  description,
                  reps,
                  isPlaying,
                  setIsPlaying,
                });
              }
            )}
          </Slider>
          <ButtonBack className="slide-buttons absolute top-[50%] min-h-[20%] w-[18%] translate-y-[-50%]">
            <div className="flex min-h-[100px] flex-row justify-center">
              <img src={prev} alt="previous" />
            </div>
          </ButtonBack>
          <ButtonNext className="slide-buttons absolute right-0 top-[50%] min-h-[20%] w-[18%] translate-y-[-50%]">
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
