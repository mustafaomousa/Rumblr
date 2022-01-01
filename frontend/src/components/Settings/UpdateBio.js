import { Button, Stack, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e8e8e8",
        backgroundColor: "rgba(0,0,0,0.1)",
      },
      "&:hover fieldset": {
        borderWidth: 2,
        borderColor: "#e8e8e8",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 3,
        borderColor: "#e8e8e8",
      },
    },
  },
})(TextField);

const UpdateBio = ({ sessionUser, updateSessionUser, notificationRef }) => {
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
  }, [bio, sessionUser.bio]);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <StyledTextField
          color="secondary"
          variant="outlined"
          onChange={updateBio}
          label="Bio"
          value={bio}
          minRows={5}
          inputProps={{ sx: { color: "#ffffff" } }}
          InputLabelProps={{ sx: { color: "#ffffff" } }}
          disableUnderline
          multiline
        />
        <Stack marginTop={"10px"} alignItems="flex-end">
          <Button
            disableElevation
            color="secondary"
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
