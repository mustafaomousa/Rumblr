import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  TextField,
  CardHeader,
  Typography,
  CardActions,
  Alert,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";

import "./login.css";
import * as sessionActions from "../../../store/session";

const LoginFormPage = ({ switchToSignup }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (sessionUser) return <Redirect to="/discover" />;

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    dispatch(sessionActions.login(credential, password)).catch((res) => {
      setErrors(res.data.errors);
    });
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    let demoCredential = "demo-user";
    let demoPassword = "password";
    dispatch(sessionActions.login(demoCredential, demoPassword)).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ fontSize: "50px", color: "white", fontWeight: "bolder" }}
      >
        Rumblr
      </Typography>
      <form onSubmit={onSubmit} className="login-form-page">
        <div className="login-form">
          <InputLabel sx={{ color: "white" }}>Username or email</InputLabel>
          <TextField
            size="small"
            id="input"
            type="text"
            onChange={updateCredential}
            value={credential}
            color="secondary"
            sx={{ background: "white", borderRadius: "0.5em" }}
            required
          />
          <br />
          <InputLabel sx={{ color: "white" }}>Password</InputLabel>
          <TextField
            variant="outlined"
            id="input"
            size="small"
            type="password"
            onChange={updatePassword}
            value={password}
            color="secondary"
            sx={{ background: "white", borderRadius: "0.5em" }}
            required
          />
        </div>
        <Box sx={{ paddingTop: "20px" }}>
          {errors &&
            errors.map((error) => <Alert severity="error">{error}</Alert>)}
        </Box>
        <div className="login-form-footer">
          <div>
            <Button sx={{ color: "white" }} onClick={switchToSignup}>
              Switch to sign up
            </Button>
          </div>
          <div>
            <Button sx={{ color: "white" }} onClick={onSubmit} type="submit">
              Log in
            </Button>
            <Button sx={{ color: "white" }} onClick={demoLogin}>
              Demo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginFormPage;
