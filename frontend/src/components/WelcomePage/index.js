import { useState } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Button, Stack, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: "auto",
    width: 450,
    height: 500,
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
    <Box className={classes.root}>
      <Typography fontSize="70px" color="#333A56" fontWeight="bold">
        Rumblr
      </Typography>
      {showLogin && <LoginForm />}
      {showSignup && <SignupForm switchToLogin={switchToLogin} />}
      <Stack alignItems="flex-end" width={305}>
        <Button
          size="small"
          variant="text"
          onClick={showLogin ? switchToSignup : switchToLogin}
        >
          {showLogin ? "Don't have an account?" : "Already have an account?"}
        </Button>
      </Stack>
    </Box>
  );
};

export default WelcomePage;
