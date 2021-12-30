import { Button, Stack, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from "../useGlobalStyles";

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

const UpdatePassword = ({
  sessionUser,
  updateSessionUser,
  notificationRef,
}) => {
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      notificationRef.current.toggleNotification({
        message: "Password updated!",
        severity: "success",
      });
      setPassword("");
      setConfirmPassword("");
      setIsChanged(false);
      dispatch(updateSessionUser(sessionUser.id, { password }));
    }
  };

  useEffect(() => {
    if (password === confirmPassword && password !== "") {
      setIsChanged(true);
    }
  }, [password, confirmPassword]);

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <StyledTextField
          color="secondary"
          variant="outlined"
          type="password"
          label="New password"
          onChange={updatePassword}
          value={password}
          inputProps={{ sx: { color: "#ffffff" } }}
          InputLabelProps={{ sx: { color: "#ffffff" } }}
          size="small"
          disableUnderline
          className={globalStyles.input}
        />
        <StyledTextField
          color="secondary"
          variant="outlined"
          type="password"
          error={password !== confirmPassword}
          label="Confirm new password"
          value={confirmPassword}
          onChange={updateConfirmPassword}
          inputProps={{ sx: { color: "#ffffff" } }}
          InputLabelProps={{ sx: { color: "#ffffff" } }}
          size="small"
          disableUnderline
          className={globalStyles.input}
        />
      </Stack>
      <Stack marginTop="10px" alignItems="flex-end">
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
    </form>
  );
};

export default UpdatePassword;
