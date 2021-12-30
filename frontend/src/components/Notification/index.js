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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{ marginTop: "50px" }}
    >
      <Alert
        onClose={handleClose}
        severity={contentSeverity ? contentSeverity : "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

export default Notification;
