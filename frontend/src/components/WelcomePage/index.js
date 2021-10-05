import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Typography } from "@mui/material";

import "./index.css";

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const switchToLogin = () => setShowLogin(true);
  const switchToSignup = () => setShowLogin(false);

  return (
    <div className="WelcomePage">
      {showLogin ? (
        <div className="WelcomeContainer">
          <LoginFormPage />
          <a text onClick={switchToSignup} id="SwitchButton">
            Need an account? Sign up
          </a>
        </div>
      ) : (
        <div className="WelcomeContainer">
          <SignupFormPage />
          <a text onClick={switchToLogin} id="SwitchButton">
            Already have an account? Log in
          </a>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
