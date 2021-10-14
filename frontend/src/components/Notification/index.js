import { Snackbar } from "@mui/material";

const Notification = ({ open, handleClose, message }) => {
  return (
    <Snackbar
      sx={{ position: "fixed", zIndex: "10000", bottom: 0 }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default Notification;
