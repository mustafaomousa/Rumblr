import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from "../../../store/session";

import "./signup.css";

const SignupFormPage = ({ switchToLogin }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatedPassword = (e) => setPassword(e.target.value);
  const updatedConfirmPassword = (e) => setConfirmPassword(e.target.value);

  if (sessionUser) return <Redirect to="/discover" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);

      const payload = {
        email,
        username,
        password,
      };

      dispatch(sessionActions.signup(payload)).catch((res) => {
        console.log(res);
        setErrors(res.data.errors);
      });
    }

    return setErrors([
      "Confirm Password field must be the same as the Password",
    ]);
  };

  return (
    <Card className="signup-form-page">
      <CardHeader
        align="center"
        subheader="Sign up"
        title={
          <Typography
            sx={{ fontSize: "50px", color: "#301934", fontWeight: "bolder" }}
          >
            Rumblr
          </Typography>
        }
      />
      <CardContent>
        <form className="signup-form">
          <TextField
            onChange={updateUsername}
            size="small"
            value={username}
            label="create a username"
            required
          />
          <br />
          <TextField
            size="small"
            onChange={updateEmail}
            value={email}
            label="enter email"
            required
          />
          <br />
          <TextField
            size="small"
            type="password"
            onChange={updatedPassword}
            label="create a password"
            required
          />
          <br />
          <TextField
            size="small"
            type="password"
            onChange={updatedConfirmPassword}
            label="confirm password"
            required
          />
        </form>
        {errors && (
          <Box sx={{ paddingTop: "20px" }}>
            {errors.map((error) => (
              <Alert severity="error">{error}</Alert>
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions className="signup-form-footer">
        <div>
          <Button onClick={switchToLogin}>Switch to log in</Button>
        </div>
        <div>
          <Button onClick={onSubmit}>Join</Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default SignupFormPage;
