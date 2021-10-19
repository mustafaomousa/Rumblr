import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Modal } from "@mui/material";

import "./index.css";

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="WelcomePage">
      {showLogin && <LoginFormPage switchToSignup={switchToSignup} />}
      {showSignup && <SignupFormPage switchToLogin={switchToLogin} />}
    </div>
  );
};

export default WelcomePage;
