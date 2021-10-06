import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";

import "./signup.css";

const SignupFormPage = ({ switchToLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatedPassword = (e) => setPassword(e.target.value);
  const updatedConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);
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
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });

      return history.push("/discover");
    }
    return setErrors([
      "Confirm Password field must be the same as the Password",
    ]);
  };

  return (
    <Card className="SignupFormPage">
      <CardHeader
        align="center"
        title={
          <Typography sx={{ fontSize: "20px" }}>Join the family</Typography>
        }
        avatar={<Avatar>R</Avatar>}
      />
      <CardContent>
        <form onSubmit={onSubmit} className="SignupForm">
          <TextField
            onChange={updateUsername}
            value={username}
            label="create a username"
            required
          />
          <br />
          <TextField
            onChange={updateEmail}
            value={email}
            label="enter email"
            required
          />
          <br />
          <TextField
            type="password"
            onChange={updatedPassword}
            label="create a password"
            required
          />
          <br />
          <TextField
            type="password"
            onChange={updatedConfirmPassword}
            label="confirm password"
            required
          />
        </form>
      </CardContent>
      <CardActions className="SignupFormFooter">
        <div>
          <Button onClick={switchToLogin}>Switch to log in</Button>
        </div>
        <div>
          <Button type="submit" id="submit">
            Join
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default SignupFormPage;
