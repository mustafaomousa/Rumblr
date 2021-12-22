import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import {
  restoreUser,
  updateProfilePicture,
  updateSessionUser,
} from "../../store/session";
import { fetch } from "../../store/csrf";
import useGlobalStyles from "../useGlobalStyles";
import UpdateBio from "./UpdateBio";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import UpdatePassword from "./UpdatePassword";
import UpdateProfilePicture from "./UpdateProfilePicture";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const globalStyles = useGlobalStyles();
  const sessionUser = useSelector((state) => state.session.user);

  const config = {
    bucketName: "rumblr-app",
    dirName: sessionUser.username.profile_picture,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_ID,
  };

  return (
    <Grid container marginTop="100px" align="center" padding="0px 20px">
      <Grid item xs={12}>
        <Stack direction="column" maxWidth="1200px" align="start">
          <Box sx={{ backgroundColor: "#333A56", padding: "10px 20px" }}>
            <Typography variant="h5" color="secondary">
              Account Settings
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="column" maxWidth="1200px" align="start">
          <Box sx={{ border: "5px solid #333A56", padding: "10px 25px" }}>
            <Grid container padding={2} spacing={3} gridAutoFlow={"row"}>
              <Grid item xs={4}>
                <UpdateProfilePicture
                  sessionUser={sessionUser}
                  updateSessionUser={updateSessionUser}
                />
              </Grid>
              <Grid item xs={8}>
                <UpdateBio
                  sessionUser={sessionUser}
                  updateSessionUser={updateSessionUser}
                />
              </Grid>
            </Grid>
            <Grid container padding={2} spacing={3} gridAutoFlow={"row"}>
              <Grid item xs={4}>
                <UpdatePersonalInformation
                  sessionUser={sessionUser}
                  updateSessionUser={updateSessionUser}
                />
              </Grid>
              <Grid item xs={4}>
                <UpdatePassword
                  sessionUser={sessionUser}
                  updateSessionUser={updateSessionUser}
                />
              </Grid>
              <Grid item xs={4}>
                <Stack justifyContent="flex-end" height="100%">
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    disabled={sessionUser.username === "demo-user"}
                  >
                    Delete Account
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
