import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Alert,
  InputLabel,
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        sx={{ fontSize: "50px", color: "white", fontWeight: "bolder" }}
      >
        Rumblr
      </Typography>
      <form className="signup-form-page">
        <InputLabel sx={{ color: "white" }}>Username</InputLabel>
        <TextField
          onChange={updateUsername}
          size="small"
          value={username}
          required
          sx={{ background: "white", borderRadius: "0.5em" }}
        />
        <br />
        <InputLabel sx={{ color: "white" }}>Email</InputLabel>
        <TextField
          size="small"
          onChange={updateEmail}
          value={email}
          required
          sx={{ background: "white", borderRadius: "0.5em" }}
        />
        <br />
        <InputLabel sx={{ color: "white" }}>Password</InputLabel>
        <TextField
          size="small"
          type="password"
          onChange={updatedPassword}
          required
          sx={{ background: "white", borderRadius: "0.5em" }}
        />
        <br />
        <InputLabel sx={{ color: "white" }}>Confirm Password</InputLabel>
        <TextField
          size="small"
          type="password"
          onChange={updatedConfirmPassword}
          required
          sx={{ background: "white", borderRadius: "0.5em" }}
        />
        <Box sx={{ paddingTop: "20px" }}>
          {errors &&
            errors.map((error) => <Alert severity="error">{error}</Alert>)}
        </Box>
        <div className="signup-form-footer">
          <div>
            <Button color="secondary" onClick={switchToLogin}>
              Switch to log in
            </Button>
          </div>
          <div>
            <Button type="submit" color="secondary" onClick={onSubmit}>
              Join
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupFormPage;
