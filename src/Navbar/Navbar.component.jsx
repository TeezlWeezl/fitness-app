import { NavLink } from "react-router-dom";
import "./Navbar.style.css";

import homeIcon from "../icon/Navbar__home.svg";
import programIcon from "../icon/Navbar__program.svg";
import profileIcon from "../icon/Navbar__profile.svg";

export function Navbar(props) {
  return (
    <nav className=" fixed bottom-0 left-0  min-w-full rounded-t-[20px] bg-black/40 px-10 py-[14px]">
      <ul className="flex justify-between">
        <li>
          <NavLink to={`/`}>
            {({ isActive, isPending }) => (
              <img
                className={isActive ? "" : "navicon-disabled"}
                src={homeIcon}
              ></img>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/programs`}>
            {({ isActive, isPending }) => (
              <img
                className={isActive ? "" : "navicon-disabled"}
                src={programIcon}
              ></img>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile`}>
            {({ isActive, isPending }) => (
              <img
                className={isActive ? "" : "navicon-disabled"}
                src={profileIcon}
              ></img>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
