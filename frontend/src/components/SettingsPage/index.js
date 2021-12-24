import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { updateSessionUser } from "../../store/session";
import UpdateBio from "./UpdateBio";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import UpdatePassword from "./UpdatePassword";
import UpdateProfilePicture from "./UpdateProfilePicture";

const SettingsPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <Stack marginTop="100px" alignItems="center">
      <Grid container maxWidth="1200px">
        <Grid item xs={12}>
          <Stack direction="column" align="start">
            <Box sx={{ backgroundColor: "#333A56", padding: "10px 20px" }}>
              <Typography variant="h5" color="secondary">
                Account Settings
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ backgroundColor: "#ffffff" }}>
          <Stack direction="column" align="start">
            <Box sx={{ border: "5px solid #333A56", padding: "10px 25px" }}>
              <Grid container padding={2} spacing={3} gridAutoFlow={"row"}>
                <Grid item xs={4}>
                  <UpdateProfilePicture
                    sessionUser={sessionUser}
                    updateSessionUser={updateSessionUser}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid container direction="column">
                    <Grid item xs={6}>
                      <UpdateBio
                        sessionUser={sessionUser}
                        updateSessionUser={updateSessionUser}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} gridAutoFlow={"row"}>
                        <Grid item xs={6}>
                          <UpdatePersonalInformation
                            sessionUser={sessionUser}
                            updateSessionUser={updateSessionUser}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <UpdatePassword
                            sessionUser={sessionUser}
                            updateSessionUser={updateSessionUser}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SettingsPage;
