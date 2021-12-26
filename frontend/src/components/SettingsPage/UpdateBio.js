import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from "../useGlobalStyles";

const UpdateBio = ({ sessionUser, updateSessionUser, notificationRef }) => {
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const [bio, setBio] = useState(sessionUser.bio);
  const [isChanged, setIsChanged] = useState(false);

  const updateBio = (e) => {
    setIsChanged(true);
    setBio(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSessionUser(sessionUser.id, { bio }));
    setIsChanged(false);
    return notificationRef.current.toggleNotification({
      message: "Bio updated!",
      severity: "success",
    });
  };

  useEffect(() => {
    if (bio === sessionUser.bio) {
      setIsChanged(false);
    }
  }, [bio]);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Typography color="primary" variant="h6" gutterBottom={2}>
          Bio
        </Typography>
        <TextField
          color="primary"
          variant="outlined"
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
            disableElevation
            color="primary"
            type="submit"
            size="small"
            variant="contained"
            disabled={!isChanged}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UpdateBio;
