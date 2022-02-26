import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import Styles from "./styles/navbar.css";

const Navbar: FunctionComponent = () => {
  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Browse</NavLink>
          </li>
          <li>
            <NavLink to="download">Download</NavLink>
          </li>
          <li>
            <NavLink to="organize">Organize</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
