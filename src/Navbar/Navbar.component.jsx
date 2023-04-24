import { NavLink } from "react-router-dom";
import "./Navbar.style.css";

export function Navbar(props) {
  return (
    <nav className=" fixed bottom-0 left-0  min-w-full rounded-t-[20px] bg-black/40 px-10 py-[14px]">
      <ul className="flex justify-between">
        <li>
          <NavLink to={`/`}>
            <img
              className={props.nav !== "home" ? "navicon-disabled" : ""}
              src="../icon/Navbar__home.svg"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/programs`}>
            <img
              className={props.nav !== "programs" ? "navicon-disabled" : ""}
              src="../icon/Navbar__program.svg"
            ></img>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile`}>
            <img
              className={props.nav !== "profile" ? "navicon-disabled" : ""}
              src="../icon/Navbar__profile.svg"
            ></img>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
