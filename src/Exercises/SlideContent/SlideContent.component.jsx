import { Slide } from "pure-react-carousel";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ActionButton } from '../../ActionButton';

import bell1x from "../../audio/bell-1x.mp3";
import bell3x from "../../audio/bell-3x.mp3";
import info from "../../icon/Exercises__info.svg";

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

const SlideContent = ({
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
  setExercisesFinished,
  color,
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
              return;
            }
            // if the timer is active, toggle the timer only of the exercise that is currently running
            if (timerActive.current && isPlaying[index]) {
              setIsPlaying((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
              });
              timerActive.current = false;
            }
          }}
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
              setExercisesFinished((prev) => {
                prev[index] = true;
                return prev;
              });
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
        <ActionButton
          className="bottom absolute top-[80%] bg-app-"
          color={color}
          onClick={(e) => {
            setExercisesFinished(prev => {
              prev[index] = true;
              return prev;
            })
          }}
        >
          geschafft
        </ActionButton>
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

export { SlideContent };
