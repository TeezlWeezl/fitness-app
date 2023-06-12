import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ setIsModalOpen, contentType, programId, workoutId }) => {
  const navigate = useNavigate();

  const renderContent = (contentType) => {
    if (contentType === "exerciseFinished")
      return (
        <React.Fragment>
          <div>
            {/*Header of the Modal*/}
            <h1 className="headline-1">Glückwunsch!</h1>
          </div>
          <div className="mt-7">
            {/*Body of the Modal*/}
            <p className="mtext font-bold">Du hast X Tage</p>
            <p className="mtext font-bold">am Stück trainiert</p>
          </div>
          <div className="mt-5">
            {/*Footer of the Modal*/}
            <p className="mtext">Wie war das Workout?</p>
            <div className="mt-2 flex justify-between gap-2">
              <button
                className="mtext min-w-[30%] rounded-md bg-app-medium p-3"
                onClick={(e) => {
                  if (e.target.classList.contains("bg-green-500")) {
                    e.target.classList.remove("bg-green-500");
                  } else {
                    e.target.classList.add("bg-green-500");
                    e.target.nextElementSibling.classList.remove(
                      "bg-green-500"
                    );
                    e.target.nextElementSibling.nextElementSibling.classList.remove(
                      "bg-green-500"
                    );
                  }
                }}
              >
                zu
                <br />
                leicht
              </button>
              <button
                className="mtext min-w-[30%] rounded-md bg-app-medium p-3"
                onClick={(e) => {
                  if (e.target.classList.contains("bg-green-500")) {
                    e.target.classList.remove("bg-green-500");
                  } else {
                    e.target.classList.add("bg-green-500");
                    e.target.previousElementSibling.classList.remove(
                      "bg-green-500"
                    );
                    e.target.nextElementSibling.classList.remove(
                      "bg-green-500"
                    );
                  }
                }}
              >
                genau
                <br />
                richtig
              </button>
              <button
                className="mtext min-w-[30%] rounded-md bg-app-medium p-3"
                onClick={(e) => {
                  if (e.target.classList.contains("bg-green-500")) {
                    e.target.classList.remove("bg-green-500");
                  } else {
                    e.target.classList.add("bg-green-500");
                    e.target.previousElementSibling.classList.remove(
                      "bg-green-500"
                    );
                    e.target.previousElementSibling.previousElementSibling.classList.remove(
                      "bg-green-500"
                    );
                  }
                }}
              >
                zu
                <br />
                schwer
              </button>
            </div>
            <button
              className="stext mtext mt-3 min-w-full rounded-md bg-app-medium p-3"
              onClick={(e) => {
                navigate(`/programs/${programId}/${workoutId}`);
              }}
            >
              Workout beenden
            </button>
          </div>
        </React.Fragment>
      );
    else if (contentType === "exerciseCanceled")
      return (
        <React.Fragment>
          <div>
            {/*Header of the Modal*/}
            <h2 className="headline-2">
              Möchtest du das Workout wirklich beenden?
            </h2>
          </div>
          <div className="mt-7">
            {/*Body of the Modal*/}
            <p className="mtext">
              Dein bisheriger Fortschritt
              <br />
              geht somit verloren.
            </p>
          </div>
          <div className="mt-7 flex justify-center gap-2">
            {/*Footer of the Modal*/}
            <button
              className="mtext rounded-xl p-3"
              onClick={() => {
                setIsModalOpen(() => false);
              }}
            >
              Nein, weiter machen.
            </button>
            <button
              className="mtext rounded-xl bg-app-medium p-3"
              onClick={() => {
                navigate(`/programs/${programId}/${workoutId}`);
              }}
            >
              Ja, beenden.
            </button>
          </div>
        </React.Fragment>
      );
  };

  return (
    <div className="fixed min-h-full min-w-full">
      /*Background of the Modal*/
      <div
        className={`absolute top-0 z-20 min-h-full min-w-full bg-app-medium opacity-75`}
      ></div>
      <div className="absolute left-[50%] top-[50%] z-30 min-w-full -translate-x-1/2 -translate-y-1/2 bg-app-dark p-5 text-center">
        {renderContent(contentType)}
      </div>
    </div>
  );
};

export { Modal };
