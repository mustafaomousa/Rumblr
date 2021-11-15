import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import { restoreUser, updateProfilePicture } from "../../store/session";
import "./index.css";
import AccountSettings from "./AccountSettings";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [settingsView, setSettingsView] = useState(0);
  const updateSelectedImage = (e) => setSelectedImage(e.target.files[0]);

  const updateSettingsView = (viewNumber) => setSettingsView(viewNumber);

  const config = {
    bucketName: "rumblr-app",
    dirName: sessionUser.username.profile_picture,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_ID,
  };

  const updateProfilePic = async (e) => {
    e.preventDefault();

    await S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        dispatch(updateProfilePicture(sessionUser.id, data.location));
      })
      .then(() => restoreUser());
  };

  return (
    <div className="settings-page">
      <Typography letterSpacing={2} color="white" padding={"10px 0px 50px 0px"}>
        {sessionUser.username} - {sessionUser.email}
      </Typography>
      <AccountSettings
        sessionUser={sessionUser}
        updateProfilePic={updateProfilePic}
        selectedImage={selectedImage}
      />
      <br />
      <Box sx={{ width: "100%" }}>
        <Box>
          <InputLabel sx={{ color: "white" }}>New Password</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            color="secondary"
            sx={{ background: "white", borderRadius: "0.5em" }}
          />
        </Box>
        <br />
        <Box>
          <InputLabel sx={{ color: "white" }}>Confirm Password</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            color="secondary"
            sx={{ background: "white", borderRadius: "0.5em" }}
          />
        </Box>
        <br />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined">Change Password</Button>
        </Box>
      </Box>
    </div>
  );
};

export default SettingsPage;
