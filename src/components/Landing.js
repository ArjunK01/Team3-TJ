import React from "react";
import "../styles/base.css";
import "../styles/landing.css";
import image from "../images/slug.png";
import { useHistory } from "react-router-dom";

const Landing = () => {
  let history = useHistory();
  return (
    <div className="landingContainer">
      <div className="landingCenter">
        <div className="landingTextContainer">
          <div className="landingMain">Welcome to TJ Elementary</div>
          <div className="landingSecondary">
            Log in to access the staff portal
          </div>
          <div
            className="landingCTA btn btn-light"
            onClick={() => history.push(`/login`)}
          >
            Log In
          </div>
        </div>
        <div className="landingHeroContainer">
          <img className="mascot" src={image} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
