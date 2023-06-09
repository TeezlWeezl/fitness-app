import React from "react";

import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from "pure-react-carousel";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useExercises } from "../hooks/useExercises";
import { ProgressCircle } from "./ProgressCircle";
import { SlideContent } from "./SlideContent";
import { Modal } from "./Modal";

import "pure-react-carousel/dist/react-carousel.es.css";
import next from "../icon/Exercises__slider-next.svg";
import prev from "../icon/Exercises__slider-prev.svg";
import closeIcon from "../icon/close.svg";
import "./Exercises.style.css";

function Exercises(props) {
  // extract the params from the url
  const { programId, workoutId } = useParams();
  // connect the useExercises hook
  const { error, data, loading } = useExercises(programId, workoutId);
  // add state for start and stopping the timer
  const [isPlaying, setIsPlaying] = useState([]);
  // set the state of isPlaying to false for each exercise once the data is loaded
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
  const [exercisesFinished, setExercisesFinished] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    type: "exerciseCanceled",
    isOpen: false,
  });
  useEffect(() => {
    if (data) {
      const exercises =
        data.program.programWorkoutSchedule[0].workout.exercises;
      setIsPlaying(() => exercises.map(() => false));
      setExercisesFinished(() => exercises.map(() => false));
    }
  }, [data]);

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
        <button
          onClick={() => {
            setIsModalOpen(() => ({
              isOpen: true,
              type: "exerciseCanceled",
            }));
          }}
        >
          <img
            src={closeIcon}
            alt="close"
            className="absolute right-5 top-5 z-10 w-4"
          />
        </button>

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
                <ProgressCircle
                  index={index}
                  currentSlide={currentSlide}
                  color={color}
                  exercisesFinished={exercisesFinished}
                />
              </div>
            ))
          }
        </div>

        {isModalOpen.isOpen &&
          createPortal(
            <Modal
              contentType={isModalOpen.type}
              setIsModalOpen={setIsModalOpen}
              programId={programId}
              workoutId={workoutId}
            />,
            document.body
          )}

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
                return (
                  <SlideContent
                    key={id}
                    index={index}
                    id={id}
                    type={type}
                    name={name}
                    duration={duration}
                    description={description}
                    reps={reps}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    slideButtons={slideButtons}
                    bellsActive={bellsActive}
                    timerActive={timerActive}
                    exercisesFinished={exercisesFinished}
                    setExercisesFinished={setExercisesFinished}
                    color={color}
                    setIsModalOpen={setIsModalOpen}
                  />
                );
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
