import {
  Button,
  Alert,
  Grid,
  FormControl,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../../store/session";
import useGlobalStyles from "../../useGlobalStyles";

const useStyles = makeStyles(() => ({
  formControl: {
    width: 305,
    height: "100%",
  },
}));

const SignupForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalStyles = useGlobalStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

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
        setErrors(res.data.errors);
      });
    }

    return setErrors([
      "Confirm Password field must be the same as the Password",
    ]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Username"
              className={globalStyles.input}
              disableUnderline
              onChange={updateUsername}
              value={username}
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Email"
              className={globalStyles.input}
              disableUnderline
              onChange={updateEmail}
              value={email}
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Password"
              type="password"
              className={globalStyles.input}
              disableUnderline
              onChange={updatePassword}
              value={password}
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <TextField
              size="small"
              label="Confirm password"
              type="password"
              className={globalStyles.input}
              disableUnderline
              onChange={updateConfirmPassword}
              value={confirmPassword}
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
                Sign up
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

export default SignupForm;
