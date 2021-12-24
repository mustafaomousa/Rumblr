import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from "../useGlobalStyles";

const UpdatePassword = ({ sessionUser, updateSessionUser }) => {
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      return dispatch(updateSessionUser(sessionUser.id, { password }));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Typography color="primary" variant="h6" gutterBottom={2}>
          Password
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            color="primary"
            variant="outlined"
            type="password"
            error={confirmPassword && password !== confirmPassword}
            label="New password"
            onChange={updatePassword}
            size="small"
            disableUnderline
            className={globalStyles.input}
          />
          <TextField
            color="primary"
            variant="outlined"
            type="password"
            error={password !== confirmPassword}
            label="Confirm new password"
            onChange={updateConfirmPassword}
            size="small"
            disableUnderline
            className={globalStyles.input}
          />
        </Stack>
        <Stack padding="10px 0px">
          <Button
            disableElevation
            color="primary"
            type="submit"
            size="small"
            variant="contained"
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdatePassword;
