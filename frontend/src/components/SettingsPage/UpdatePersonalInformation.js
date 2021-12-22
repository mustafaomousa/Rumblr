import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from "../useGlobalStyles";

const UpdatePersonalInformation = ({ sessionUser, updateSessionUser }) => {
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSessionUser(sessionUser.id, { email, username }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Typography color="primary" variant="h6" gutterBottom={2}>
          Personal information
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Username"
            onChange={updateUsername}
            value={username}
            size="small"
            disableUnderline
            className={globalStyles.input}
          />
          <TextField
            label="Email"
            onChange={updateEmail}
            value={email}
            size="small"
            disableUnderline
            className={globalStyles.input}
          />
        </Stack>
        <Stack padding="10px 0px">
          <Button
            size="small"
            variant="contained"
            type="submit"
            disabled={
              username === sessionUser.username && email === sessionUser.email
            }
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdatePersonalInformation;
