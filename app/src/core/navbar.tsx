import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import Styles from "./styles/navbar.css";

const Navbar: FunctionComponent = () => {
  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Browse</Link>
          </li>
          <li>
            <Link to="download">Download</Link>
          </li>
          <li>
            <Link to="organize">Organize</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
