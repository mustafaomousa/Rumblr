import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { updateSessionUser } from "../../store/session";
import UpdateBio from "./UpdateBio";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import UpdatePassword from "./UpdatePassword";
import UpdateProfilePicture from "./UpdateProfilePicture";
import Notification from "../Notification";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    alignItems: "center",
  },
  userSettingsContainer: {
    maxWidth: 1200,
  },
}));

const SettingsPage = () => {
  const classes = useStyles();
  const notificationRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <Stack className={classes.root}>
      <Notification ref={notificationRef} />
      <Grid container className={classes.userSettingsContainer} spacing={1}>
        <Grid item sx={12} sm={12} md={3}>
          <UpdateProfilePicture
            sessionUser={sessionUser}
            updateSessionUser={updateSessionUser}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Grid container direction="column">
            <Grid item xs={12} sm={12} md={6}>
              <UpdateBio
                sessionUser={sessionUser}
                updateSessionUser={updateSessionUser}
                notificationRef={notificationRef}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <UpdatePersonalInformation
                    sessionUser={sessionUser}
                    updateSessionUser={updateSessionUser}
                    notificationRef={notificationRef}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <UpdatePassword
                    sessionUser={sessionUser}
                    updateSessionUser={updateSessionUser}
                    notificationRef={notificationRef}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SettingsPage;
