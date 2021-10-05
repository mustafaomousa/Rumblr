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
  Input,
  Avatar,
} from "@mui/material";
import "./login.css";

import * as sessionActions from "../../store/session";

const LoginFormPage = () => {
  const history = useHistory();
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
      if (res.data && res.data.errors) setErrors(res.data.errors);
      alert(res.data.errors);
    });

    return history.push("/discover");
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    let demoCredential = "demo-user";
    let demoPassword = "password";
    dispatch(sessionActions.login(demoCredential, demoPassword)).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
        alert(res.data.errors);
      }
    );

    return history.push("/discover");
  };

  return (
    <Card className="LoginFormPage">
      <CardHeader
        align="center"
        title={<Typography sx={{ fontSize: "20px" }}>Welcome back!</Typography>}
        avatar={<Avatar>R</Avatar>}
      />
      <CardContent>
        <form onSubmit={onSubmit} className="LoginForm">
          <TextField
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
            type="password"
            onChange={updatePassword}
            value={password}
            label="password"
            required
          />
        </form>
      </CardContent>
      <CardActions className="LoginFormFooter">
        <Button type="submit">Log in</Button>
        <Button onClick={demoLogin}>Demo</Button>
      </CardActions>
    </Card>
  );
};

export default LoginFormPage;
