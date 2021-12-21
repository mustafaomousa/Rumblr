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
  const { username } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${username}`).then((res) =>
        setUserProfile(res.data.user)
      );
    })();
  }, []);

  return (
    <Stack direction="column" className={classes.root}>
      {userProfile && (
        <Container
          sx={{
            border: "1px solid black",
            backgroundColor: "#333A56",
            paddingBottom: 10,
            borderRadius: 1,
          }}
        >
          <Container
            align="center"
            sx={{
              height: 100,
            }}
          >
            <Avatar
              sx={{
                height: 150,
                width: 150,
                border: "5px solid #333A56",
                position: "relative",
                top: 20,
              }}
            />
          </Container>
          <Grid container sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}>
            <Grid item xs={4} padding={"20px 20px"}>
              <Stack sx={{ height: "100%" }} alignItems="flex-end">
                <Typography variant="h2" noWrap>
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
                <Button variant="outlined">Follow</Button>
                <Button variant="outlined">Like</Button>
                <Button variant="outlined">Message</Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid
            direction="row"
            container
            marginTop={2}
            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
          >
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
