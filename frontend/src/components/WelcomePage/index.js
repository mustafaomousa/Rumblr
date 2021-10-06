import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { Modal, Typography } from "@mui/material";

import "./index.css";
import { Box } from "@mui/system";

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
      <Modal open={showLogin} className="WelcomePageModal">
        <LoginFormPage switchToSignup={switchToSignup} />
      </Modal>
      <Modal open={showSignup} className="WelcomePageModal">
        <SignupFormPage switchToLogin={switchToLogin} />
      </Modal>
    </div>
  );
};

export default WelcomePage;
