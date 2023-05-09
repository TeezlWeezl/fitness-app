import { Link, useParams } from "react-router-dom";
import back from "../icon/back.svg";
import { ActionButton } from "../ActionButton";

function Workout(props) {
  const { programId } = useParams();

  return (
    <div className="app-default pt-0">
      <Link to={`/programs/${programId}`}>
        <img className="absolute right-5 top-5" src={back}></img>
      </Link>
      <p className="stext absolute top-6 left-[50%] translate-x-[-50%]">Titel des Programms</p>
      <div className="flex flex-col items-center justify-center gap-7 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className="headline-1">Tag 1</h1>
        <p className="stext">26 Min. · Kraft und Koordination</p>
      </div>
      <div />
      <ActionButton color="redGradient">los!</ActionButton>
    </div>
  );
}

export { Workout };
