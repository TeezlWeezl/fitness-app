import { Link } from "react-router-dom";
import "./Navbar.style.css";

export function Navbar(props) {
  return (
    <nav className=" fixed bottom-0 left-0  min-w-full rounded-t-[20px] bg-black/40 px-10 py-[14px]">
      <ul className="flex justify-between">
        <li>
          <Link to={`/`}>
            <img
              className={props.nav !== "home" ? "navicon-disabled" : ""}
              src="../icon/Navbar__home.svg"
            ></img>
          </Link>
        </li>
        <li>
          <Link to={`program`}>
            <img
              className={props.nav !== "program" ? "navicon-disabled" : ""}
              src="../icon/Navbar__program.svg"
            ></img>
          </Link>
        </li>
        <li>
          <Link to={`profile`}>
            <img
              className={props.nav !== "profile" ? "navicon-disabled" : ""}
              src="../icon/Navbar__profile.svg"
            ></img>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
