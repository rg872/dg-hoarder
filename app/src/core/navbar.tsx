import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSetting, AiOutlineArrowLeft } from "react-icons/ai";

import Styles from "./styles/navbar.css";

const Navbar = () => {
  const [isBack, setIsBack] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.match(/^\/(discover|download|play)$/)) {
      setIsBack(false);
    } else {
      setIsBack(true);
    }
  }, [location]);

  return (
    <React.Fragment>
      <header className={"container-fluid " + Styles.appHeader}>
        <nav>
          <ul>
            <li>
              {isBack && (
                <AiOutlineArrowLeft
                  size={"1.3em"}
                  className="dgh-click-icon"
                  onClick={() => navigate(-1)}
                />
              )}
            </li>
            <li>
              <NavLink to="discover">Browse</NavLink>
            </li>
            <li>
              <NavLink to="download">Download</NavLink>
            </li>
            <li>
              <NavLink to="play">Play</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <AiOutlineSetting
                size={"1.3em"}
                className="dgh-click-icon"
                onClick={() => navigate("/settings")}
              />
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
