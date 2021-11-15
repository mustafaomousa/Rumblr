import { InputLabel, TextField, Button, Avatar, Input } from "@mui/material";
import { Box } from "@mui/system";

const accountSettingsStyle = {
  display: "flex",
  flexDirection: "column",
  width: "500px",
};

const AccountSettings = ({ sessionUser, updateProfilePic, selectedImage }) => (
  <Box component="form" style={accountSettingsStyle}>
    <Box>
      <InputLabel sx={{ color: "white" }}>Username</InputLabel>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        color="secondary"
        sx={{ background: "white", borderRadius: "0.5em" }}
        value={sessionUser.username}
      />
    </Box>
    <br />
    <Box>
      <InputLabel sx={{ color: "white" }}>Email</InputLabel>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        color="secondary"
        sx={{ background: "white", borderRadius: "0.5em" }}
        value={sessionUser.email}
      />
    </Box>
    <br />
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Button
        variant="outlined"
        size="medium"
        type="submit"
        sx={{ mr: "10px" }}
      >
        Update
      </Button>
      <Button variant="outlined" color="error" size="medium">
        Delete Account
      </Button>
    </Box>
    <br />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        src={sessionUser.profilePicture}
        sx={{
          marginBottom: "20px",
          width: "300px",
          height: "300px",
          borderRadius: "0.5em",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <label>
          <Input
            onChange={updateProfilePic}
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            value={selectedImage}
          />
          <Button
            variant="outlined"
            size="medium"
            component="span"
            sx={{ mr: "10px" }}
          >
            Upload
          </Button>
        </label>
        <Button variant="outlined" color="error" size="medium">
          Delete
        </Button>
      </div>
    </Box>
  </Box>
);

export default AccountSettings;
