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
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "../ActionButton";

import closeIcon from "../icon/close.svg";
import prev from "../icon/Exercises__slider-prev.svg";
import next from "../icon/Exercises__slider-next.svg";
import info from "../icon/Exercises__info.svg";
import bell3x from "../audio/bell-3x.mp3";
import bell1x from "../audio/bell-1x.mp3";
import circle from "../icon/Exercises__circle_grey.svg";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Exercises.style.css";

const renderTime = (
  { remainingTime },
  startTime,
  exerciseDuration,
  type,
  bellsActive
) => {
  if (remainingTime === startTime) {
    return (
      <div>
        <div className="mtext">Klicken</div>
        <div className="mtext">zum</div>
        <div className="mtext">starten</div>
      </div>
    );
  } else if (remainingTime <= startTime && remainingTime > exerciseDuration) {
    return (
      <div>
        <div className="mtext">Get</div>
        <div className="mtext text-3xl">{remainingTime - exerciseDuration}</div>
        <div className="mtext">Ready</div>
      </div>
    );
  } else if (remainingTime === exerciseDuration) {
    // Ring the starting bell once for exercises
    if (type === "duration") {
      if (!bellsActive.current) {
        new Audio(bell1x).play();
        bellsActive.current = true;
      }
      return (
        <div>
          <div className="mtext text-3xl">Go!</div>
        </div>
      );
    }
    return (
      <div>
        <div className="mtext">Get</div>
        <div className="mtext text-3xl">{remainingTime - exerciseDuration}</div>
        <div className="mtext">Ready</div>
      </div>
    );
  } else if (remainingTime < exerciseDuration && remainingTime > 0) {
    return (
      <div>
        <div className="mtext">Verbleibend</div>
        <div className="mtext text-3xl">{remainingTime}</div>
        <div className="mtext">Sekunden</div>
      </div>
    );
  } else {
    // Ring the bell three times for exercises
    if (type === "duration" && bellsActive.current) {
      new Audio(bell3x).play();
      bellsActive.current = false;
    }
    // Reset the helper variable that next exercise can start
    return <div className="mtext text-3xl">Fertig</div>;
  }
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
  slideButtons,
  bellsActive,
  timerActive,
}) => {
  let exerciseContainer;

  if (type === "duration" || type === "break") {
    exerciseContainer = (
      <div className="min-h-full">
        <button
          onClick={() => {
            // The function calls below are necessary to prevent that multiple timers are running at the same time

            // if the timer is not active, toggle the timer
            if (!timerActive.current) {
              setIsPlaying((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
              });
              timerActive.current = true;
              return
            }
            // if the timer is active, toggle the timer only of the exercise that is currently running
            if (timerActive.current && isPlaying[index]) {
              setIsPlaying((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
            })
            timerActive.current = false;
          }}}
          className="headline-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <CountdownCircleTimer
            trailColor="#4D5059"
            trailStrokeWidth={18}
            strokeWidth={18}
            isPlaying={isPlaying[index]}
            duration={duration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[duration, (duration * 2) / 3, (duration * 1) / 3, 0]}
            onComplete={() => {
              timerActive.current = false;
              return { shouldRepeat: false };
            }}
            initialRemainingTime={type !== "break" && duration + 6}
          >
            {({ remainingTime }) =>
              renderTime(
                { remainingTime },
                type === "break" ? duration : duration + 6,
                duration,
                type,
                bellsActive
              )
            }
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
        /* Show a description info box if there is one */
        description && (
          <div
            id="info-box"
            className="absolute left-0 top-[90%] h-[80%] w-full rounded-t-[30px] bg-app-medium transition-all"
          >
            <div></div>
            <div
              className="min-h-full min-w-full"
              onClick={(e) => {
                slideButtons.current.classList.add("hidden");
                e.currentTarget.parentElement.classList.remove("top-[90%]");
                e.currentTarget.parentElement.classList.add("top-[20%]");
              }}
            >
              <div className="absolute right-4 top-4 flex min-h-[35px] min-w-[35px] justify-center rounded-full bg-app-dark">
                <img src={info} alt="exercise info" />
              </div>
              <div className="absolute top-[15%] max-h-[70%] overflow-scroll px-9 text-left">
                <h1 className="headline-1">{name}</h1>
                <p className="mtext mt-5">{description}</p>
              </div>
            </div>
            <ActionButton
              className="bottom absolute top-[87%] text-white"
              color="bg-app-dark"
              onClick={(e) => {
                slideButtons.current.classList.remove("hidden");
                e.currentTarget.parentElement.classList.remove("top-[20%]");
                e.currentTarget.parentElement.classList.add("top-[90%]");
                e.currentTarget.previousElementSibling.children[1].scrollTop = 0;
              }}
            >
              ok!
            </ActionButton>
          </div>
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
  const [isPlaying, setIsPlaying] = useState([]);
  // set the state of isPlaying to false for each exercise once the data is loaded
  useEffect(() => {
    if (data) {
      setIsPlaying(() =>
        data.program.programWorkoutSchedule[0].workout.exercises.map(
          () => false
        )
      );
    }
  }, []);
  // reference the slide buttons to hide them when the info box is open
  const slideButtons = useRef(0);
  const progressBar = useRef(0);
  // helper variable to ring the bell only once in renderTime()
  let bellsActive = useRef(false);
  // helper variable to prevent the timer from being started when another timer is already running
  let timerActive = useRef(false);
  const [progressBarPosX, setProgressBarPosX] = useState(undefined);
  const [slideButtonIsClickable, setSlideButtonIsClickable] = useState({
    back: true,
    next: true,
  });
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <div
          className="absolute left-[calc(50%-5px)] top-[12%] flex min-w-full items-center justify-start transition-all duration-500 ease-[cubic-bezier(.645,.045,.355,1)]"
          ref={progressBar}
          style={{ left: progressBarPosX && `${progressBarPosX}px` }}
        >
          {
            /* Show the progress bar */
            exercises.map((_, index) => (
              <div
                className={`background-dotted ml-[18px] mr-[8px] min-h-full pr-[70px] first-of-type:pl-0 last-of-type:bg-none last-of-type:pr-0`}
                key={index}
              >
                <div
                  className={`min-h-[25px] min-w-[25px] -translate-x-[20px] rounded-full border-[5px] border-app-medium ${
                    /* Only show colored circle, if it is the current slide */
                    currentSlide === index && `${color} border-none`
                  }`}
                ></div>
              </div>
            ))
          }
        </div>

        <CarouselProvider
          naturalSlideWidth={
            /* Use the windows innerWidth and innerHeight for the aspect ratio of each slide */
            window.innerWidth
          }
          naturalSlideHeight={window.innerHeight}
          totalSlides={exercises.length}
          className="absolute top-0 w-full"
          touchEnabled={false}
        >
          <Slider className="relative">
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
                  slideButtons,
                  bellsActive,
                  timerActive,
                });
              }
            )}
          </Slider>
          <div id="slide-buttons" ref={slideButtons}>
            <ButtonBack
              className="absolute top-[50%] min-h-[20%] w-[18%] translate-y-[-50%]"
              disabled={!slideButtonIsClickable.back}
              onClick={() => {
                if (currentSlide <= 0) {
                  setSlideButtonIsClickable(
                    (prev) => (prev = { back: false, next: true })
                  );
                } else {
                  setSlideButtonIsClickable(
                    (prev) => (prev = { back: false, next: false })
                  );
                  const currentProgressBarPosX =
                    progressBar.current.getBoundingClientRect().x;
                  // width 25px + padding 70px + margin (left: 18px right: 8px) = 121px
                  const newProgressBarPosX = currentProgressBarPosX + 121;
                  setProgressBarPosX((prev) => (prev = newProgressBarPosX));
                  setTimeout(() => {
                    setSlideButtonIsClickable(
                      (prev) => (prev = { back: true, next: true })
                    );
                  }, 500);
                  setCurrentSlide((prev) => --prev);
                }
              }}
            >
              <div className="flex min-h-[100px] flex-row justify-center">
                <img src={prev} alt="previous" />
              </div>
            </ButtonBack>
            <ButtonNext
              className="slide-buttons absolute right-0 top-[50%] min-h-[20%] w-[18%] translate-y-[-50%]"
              disabled={!slideButtonIsClickable.next}
              onClick={() => {
                if (currentSlide >= exercises.length - 1) {
                  setSlideButtonIsClickable(
                    (prev) => (prev = { back: true, next: false })
                  );
                } else {
                  setSlideButtonIsClickable(
                    (prev) => (prev = { back: false, next: false })
                  );
                  const currentProgressBarPosX =
                    progressBar.current.getBoundingClientRect().x;
                  // width 25px + padding 70px + margin (left: 18px right: 8px) = 121px
                  const newProgressBarPosX = currentProgressBarPosX - 121;
                  setProgressBarPosX((prev) => (prev = newProgressBarPosX));
                  setTimeout(() => {
                    setSlideButtonIsClickable(
                      (prev) => (prev = { back: true, next: true })
                    );
                  }, 500);
                  setCurrentSlide((prev) => ++prev);
                }
              }}
            >
              <div className="flex min-h-[100px] flex-row justify-center">
                <img src={next} alt="next" />
              </div>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    );
  }
}

export { Exercises };
