import {
  Avatar,
  Button,
  Container,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import { restoreUser, updateProfilePicture } from "../../store/session";
import "./index.css";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const updateSelectedImage = (e) => setSelectedImage(e.target.files[0]);

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
      <Typography variant="h5">Settings</Typography>
      {/* <Container sx={{ width: "600px", padding: "20px" }}>
        <form style={{ display: "flex" }}>
          <Stack spacing={4}>
            <Box>
              <InputLabel sx={{ color: "whitesmoke", fontSize: "20px" }}>
                Username
              </InputLabel>
              <Input
                sx={{ color: "lightblue", borderBottom: "1px solid white" }}
                value={sessionUser.username}
              />
            </Box>
            <Box>
              <InputLabel sx={{ color: "whitesmoke", fontSize: "20px" }}>
                Email
              </InputLabel>
              <Input
                sx={{ color: "lightblue", borderBottom: "1px solid white" }}
                value={sessionUser.email}
              />
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: "10px" }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: "10px" }}
              >
                Change Password
              </Button>
              <Button variant="outlined" size="small" fullWidth>
                Delete Account
              </Button>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar
              src={sessionUser.profilePicture}
              sx={{ width: "180px", height: "180px" }}
            />
            <div
              style={{
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
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
                <Button component="span">Upload</Button>
              </label>
              <Button sx={{ color: "red" }}>Delete</Button>
            </div>
          </Box>
        </form>
      </Container> */}
    </div>
  );
};

export default SettingsPage;
