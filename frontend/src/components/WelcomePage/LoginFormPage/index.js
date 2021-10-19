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
    <Card>
      <form onSubmit={onSubmit} className="login-form-page">
        <CardHeader
          align="center"
          subheader="Log in"
          title={
            <Typography
              sx={{ fontSize: "50px", color: "#301934", fontWeight: "bolder" }}
            >
              Rumblr
            </Typography>
          }
        />
        <CardContent>
          <div className="login-form">
            <TextField
              size="small"
              id="input"
              type="text"
              onChange={updateCredential}
              value={credential}
              label="username/email"
              required
            />
            <br />
            <TextField
              id="input"
              size="small"
              type="password"
              onChange={updatePassword}
              value={password}
              label="password"
              required
            />
          </div>
          <Box sx={{ paddingTop: "20px" }}>
            {errors &&
              errors.map((error) => <Alert severity="error">{error}</Alert>)}
          </Box>
        </CardContent>
        <CardActions className="login-form-footer">
          <div>
            <Button onClick={switchToSignup}>Switch to sign up</Button>
          </div>
          <div>
            <Button type="submit">Log in</Button>
            <Button onClick={demoLogin}>Demo</Button>
          </div>
        </CardActions>
      </form>
    </Card>
  );
};

export default LoginFormPage;
