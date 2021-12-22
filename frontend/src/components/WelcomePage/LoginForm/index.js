import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Alert,
  FormControl,
  Input,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import * as sessionActions from "../../../store/session";
import { makeStyles } from "@mui/styles";
import useGlobalStyles from "../../useGlobalStyles";

const useStyles = makeStyles(() => ({
  formControl: {
    width: 305,
    height: "100%",
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalStyles = useGlobalStyles();

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
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Username or Email"
              className={globalStyles.input}
              disableUnderline
              onChange={updateCredential}
              value={credential}
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Password"
              className={globalStyles.input}
              disableUnderline
              type="password"
              onChange={updatePassword}
              value={password}
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                size="small"
                loading={sessionUser}
                variant="contained"
                onClick={onSubmit}
                type="submit"
              >
                Log in
              </Button>
              <Button
                size="small"
                loading={sessionUser}
                variant="outlined"
                className={globalStyles.button}
                onClick={demoLogin}
              >
                Demo
              </Button>
            </Stack>
          </FormControl>
        </Grid>
        <Stack paddingTop={2} spacing={2}>
          {errors &&
            errors.map((error) => <Alert severity="warning">{error}</Alert>)}
        </Stack>
      </Grid>
    </form>
  );
};

export default LoginForm;
