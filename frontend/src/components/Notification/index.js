import { Alert, Snackbar } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const Notification = forwardRef(({ ...rest }, ref) => {
  useImperativeHandle(ref, () => ({
    toggleNotification: toggleNotification,
  }));

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contentSeverity, setSeverity] = useState("");
  const handleClose = () => setOpen(false);

  const toggleNotification = ({ message, severity }) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <Snackbar
      sx={{ position: "fixed", zIndex: "10000", bottom: 0 }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={contentSeverity}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default Notification;
