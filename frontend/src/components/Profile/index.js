import { Avatar, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetch } from "../../store/csrf";
import { getProfilePosts } from "../../store/post";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PostCard from "../PostCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 20px",
  },
  profileContainer: {
    maxWidth: 1200,
  },
  profileBox: {
    top: "85px",
    position: "sticky",
    maxWidth: 500,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 20,
    [theme.breakpoints.only("sm")]: {
      width: "100%",
      marginBottom: 10,
    },
  },
  userPostsContainer: {
    maxWidth: 500,
    [theme.breakpoints.only("sm")]: {
      justifyContent: "center",
    },
  },
  userProfileContainer: {
    justifyContent: "flex-end",
    paddingRight: !isMobile && 10,
    [theme.breakpoints.only("sm")]: {
      justifyContent: "center",
    },
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { userId } = useParams();

  const [userProfile, setUserProfile] = useState(null);

  const userPosts = useSelector((state) => state.posts.loadedPosts);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${userId}`).then((res) =>
        setUserProfile(res.data.user)
      );
    })();
  }, [userId]);

  useEffect(() => dispatch(getProfilePosts(userId)), [dispatch, userId]);

  return (
    <Box display="flex" justifyContent="center" className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        className={classes.profileContainer}
        spacing={2}
      >
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={4}
          className={classes.userProfileContainer}
        >
          {userProfile && (
            <Box>
              <Box className={classes.profileBox} id="profileBox">
                <Grid container spacing={2}>
                  <Grid container item xs={6}>
                    <Avatar
                      variant="square"
                      src={userProfile.profilePicture}
                      sx={{
                        height: "auto",
                        width: "100%",
                        objectFit: "contain",
                        backgroundColor: "#e8e8e8",
                      }}
                    />
                  </Grid>
                  <Grid container item direction={"column"}>
                    <Typography
                      variant="h5"
                      color="secondary"
                      fontWeight="bold"
                      gutterBottom={1}
                    >
                      {userProfile.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="secondary"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {userProfile.bio}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={8}
          className={classes.userPostsContainer}
        >
          <Stack spacing={2} width="100%">
            {userPosts ? (
              userPosts.length ? (
                userPosts.map((post) => (
                  <Box maxWidth={500} key={post.id}>
                    <PostCard post={post} />
                  </Box>
                ))
              ) : (
                <>
                  <Stack
                    width={"100%"}
                    height={500}
                    variant="rectangular"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
                  >
                    <PhotoSizeSelectActualIcon color="secondary" />
                    <Typography color="secondary">Nothing here yet</Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={500}
                    alignItems="center"
                    justifyContent="center"
                    variant="rectangular"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
                  >
                    <PhotoSizeSelectActualIcon color="secondary" />
                    <Typography color="secondary">Nothing here yet</Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={500}
                    alignItems="center"
                    justifyContent="center"
                    variant="rectangular"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
                  >
                    <PhotoSizeSelectActualIcon color="secondary" />
                    <Typography color="secondary">Nothing here yet</Typography>
                  </Stack>
                </>
              )
            ) : (
              <>
                <Skeleton width={"100%"} height={500} variant="rectangular" />
                <Skeleton width={"100%"} height={500} variant="rectangular" />
                <Skeleton width={"100%"} height={500} variant="rectangular" />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
