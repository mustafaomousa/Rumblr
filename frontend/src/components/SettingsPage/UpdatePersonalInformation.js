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

const UpdatePersonalInformation = ({
  sessionUser,
  updateSessionUser,
  notificationRef,
}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(sessionUser.username);
  const [email, setEmail] = useState(sessionUser.email);
  const [isChanged, setIsChanged] = useState(false);

  const updateUsername = (e) => {
    setIsChanged(true);
    setUsername(e.target.value);
  };
  const updateEmail = (e) => {
    setIsChanged(true);
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSessionUser(sessionUser.id, { email, username }));
    setIsChanged(false);
    return notificationRef.current.toggleNotification({
      message: "Personal information updated!",
      severity: "success",
    });
  };

  useEffect(() => {
    if (username === sessionUser.username && email === sessionUser.email) {
      setIsChanged(false);
    }
  }, [username, email, sessionUser.email, sessionUser.username]);

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <StyledTextField
          color="secondary"
          variant="outlined"
          label="Username"
          onChange={updateUsername}
          value={username}
          inputProps={{ sx: { color: "#ffffff" } }}
          InputLabelProps={{ sx: { color: "#ffffff" } }}
          size="small"
          disableUnderline
        />
        <StyledTextField
          color="secondary"
          variant="outlined"
          label="Email"
          onChange={updateEmail}
          value={email}
          inputProps={{ sx: { color: "#ffffff" } }}
          InputLabelProps={{ sx: { color: "#ffffff" } }}
          size="small"
          disableUnderline
        />
      </Stack>
      <Stack marginTop="10px" alignItems="flex-end">
        <Button
          color="secondary"
          disableElevation
          size="small"
          variant="contained"
          type="submit"
          disabled={!isChanged}
        >
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default UpdatePersonalInformation;
