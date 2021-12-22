import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from "../useGlobalStyles";

const UpdateBio = ({ sessionUser, updateSessionUser }) => {
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const [bio, setBio] = useState(sessionUser.bio);

  const updateBio = (e) => setBio(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSessionUser(sessionUser.id, { bio }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Typography color="primary" variant="h6" gutterBottom={2}>
          Bio
        </Typography>
        <TextField
          onChange={updateBio}
          label="Bio"
          value={bio}
          minRows={5}
          disableUnderline
          multiline
          className={globalStyles.input}
        />
        <Stack padding="10px 0px">
          <Button
            type="submit"
            size="small"
            variant="contained"
            disabled={sessionUser.bio === bio}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdateBio;
