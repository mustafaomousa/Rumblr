import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Button,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetch } from "../../store/csrf";
import PostCard from "../PostCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "120px 50px",
    margin: "0 auto",
    maxWidth: "1300px",
  },
}));

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${userId}`).then((res) =>
        setUserProfile(res.data.user)
      );
    })();
  }, []);

  return (
    <Stack direction="column" className={classes.root}>
      {userProfile && (
        <Container
          sx={{
            paddingBottom: 10,
            // borderRadius: 1,
          }}
        >
          <Container
            align="center"
            sx={{
              height: 100,
            }}
          >
            <Avatar
              variant="square"
              src={userProfile.profilePicture}
              sx={{
                height: 150,
                width: 150,
                border: "15px solid #333A56",
                position: "relative",
                top: 0,
                objectFit: "contain",
              }}
            />
          </Container>
          <Grid container sx={{ backgroundColor: "#ffffff" }}>
            <Grid item xs={4} padding={"20px 20px"}>
              <Stack sx={{ height: "100%" }}>
                <Typography variant="h2" paragraph align="end">
                  {userProfile.username}
                </Typography>
                <Typography align="end" paragraph variant="body2" mt={2}>
                  {userProfile.bio}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4} padding={"0px 20px"}></Grid>
            <Grid xs={4} padding={"0px 20px"} marginTop={2} marginBottom={2}>
              <Stack spacing={2}>
                <Button variant="outlined" disabled>
                  Follow
                </Button>
                <Button variant="outlined" disabled>
                  Message
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid direction="row" container marginTop={2} spacing={2}>
            {userProfile.Posts.map((post) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Stack>
  );
};

export default Profile;
