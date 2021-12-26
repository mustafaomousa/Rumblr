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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetch } from "../../store/csrf";
import { getProfilePosts } from "../../store/post";
import PostCard from "../PostCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "100px 50px",
    margin: "0 auto",
    maxWidth: "1300px",
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const userPosts = useSelector((state) => state.posts.loadedPosts);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${userId}`).then((res) =>
        setUserProfile(res.data.user)
      );
    })();
  }, []);

  useEffect(() => dispatch(getProfilePosts(userId)), []);

  return (
    <Stack direction="column" className={classes.root}>
      {userProfile && (
        <Container
          sx={{
            paddingBottom: 10,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Stack
                sx={{ height: "100%" }}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  variant="square"
                  src={userProfile.profilePicture}
                  sx={{
                    height: 200,
                    width: 200,
                    objectFit: "contain",
                  }}
                />
                <Stack
                  direction="column"
                  justifyContent="flex-end"
                  height={"100%"}
                >
                  <Typography
                    color="secondary"
                    variant="h2"
                    paragraph
                    margin={0}
                  >
                    {userProfile.username}
                  </Typography>
                  <Typography
                    color="secondary"
                    align="start"
                    paragraph
                    variant="body1"
                    margin={0}
                  >
                    {userProfile.bio}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <Stack
                spacing={2}
                height="100%"
                direction="row"
                alignItems="flex-end"
                justifyContent={"flex-end"}
              >
                <Button size="small" color="secondary" variant="outlined">
                  Follow
                </Button>
                <Button size="small" color="secondary" variant="outlined">
                  Message
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid direction="row" container marginTop={2} spacing={2}>
            {userPosts &&
              userPosts.map((post) => (
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
