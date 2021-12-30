import { useState } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { makeStyles } from "@mui/styles";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#e8e8e8",
  },
}));

const WelcomePage = () => {
  const classes = useStyles();

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
    <Stack className={classes.root} spacing={3}>
      <Box sx={{ height: "25%" }} />
      <Typography
        variant="button"
        color="primary"
        fontWeight="bold"
        fontSize={40}
      >
        Rumblr
      </Typography>
      {showLogin && <LoginForm />}
      {showSignup && <SignupForm switchToLogin={switchToLogin} />}
      <Stack alignItems="flex-end" width={305}>
        <Button
          size="small"
          variant="text"
          color="primary"
          onClick={showLogin ? switchToSignup : switchToLogin}
        >
          {showLogin ? "Don't have an account?" : "Already have an account?"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default WelcomePage;
