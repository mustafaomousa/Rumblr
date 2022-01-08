import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { updateSessionUser } from "../../store/session";
import UpdateBio from "./UpdateBio";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import UpdatePassword from "./UpdatePassword";
import UpdateProfilePicture from "./UpdateProfilePicture";
import Notification from "../Notification";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    marginInline: "auto",
    padding: "0 30px",
    minHeight: "100vh",
    width: "min(90%, 1200px)",
  },
}));

const Settings = () => {
  const classes = useStyles();
  const notificationRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <Stack className={classes.root}>
      <Notification ref={notificationRef} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={5} lg={4}>
          <UpdateProfilePicture
            sessionUser={sessionUser}
            updateSessionUser={updateSessionUser}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <UpdateBio
                sessionUser={sessionUser}
                updateSessionUser={updateSessionUser}
                notificationRef={notificationRef}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <UpdatePersonalInformation
                    sessionUser={sessionUser}
                    updateSessionUser={updateSessionUser}
                    notificationRef={notificationRef}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
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

export default Settings;
