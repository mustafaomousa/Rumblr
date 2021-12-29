import {
  Avatar,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px 0px",
  },
  profileBox: {
    top: "85px",
    position: "sticky",
    maxWidth: "550px",
    [theme.breakpoints.only("sm")]: {
      width: "100%",
      marginBottom: 10,
    },
  },
  userPostsContainer: {
    paddingLeft: !isMobile && 10,
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
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams();
  const userPosts = useSelector((state) => state.posts.loadedPosts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${userId}`).then((res) =>
        setUserProfile(res.data.user)
      );
    })();
  }, [userId]);

  useEffect(() => dispatch(getProfilePosts(userId)), [dispatch, userId]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      className={classes.root}
    >
      <Grid
        item
        container
        sm={12}
        md={6}
        className={classes.userProfileContainer}
      >
        {userProfile && (
          <Box paddingRight={2}>
            <Box className={classes.profileBox} id="profileBox">
              <Stack direction="row" spacing={2}>
                <Avatar
                  variant="square"
                  src={userProfile.profilePicture}
                  sx={{
                    height: 120,
                    width: 120,
                    objectFit: "contain",
                    backgroundColor: "#e8e8e8",
                  }}
                />
                <Stack height="100%">
                  <Typography color="secondary" paragraph align="start">
                    {userProfile.username}
                  </Typography>
                  <Typography
                    color="secondary"
                    align="start"
                    paragraph
                    variant="body2"
                  >
                    {userProfile.bio}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        )}
      </Grid>
      <Grid
        item
        container
        sm={12}
        md={6}
        className={classes.userPostsContainer}
      >
        <Stack spacing={2} alignItems="center" justifyContent="center">
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
                  width={500}
                  height={600}
                  variant="rectangular"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
                >
                  <PhotoSizeSelectActualIcon color="secondary" />
                  <Typography color="secondary">Nothing here yet</Typography>
                </Stack>
                <Stack
                  width={500}
                  height={600}
                  alignItems="center"
                  justifyContent="center"
                  variant="rectangular"
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
                >
                  <PhotoSizeSelectActualIcon color="secondary" />
                  <Typography color="secondary">Nothing here yet</Typography>
                </Stack>
                <Stack
                  width={500}
                  height={600}
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
              <Skeleton width={500} height={600} variant="rectangular" />
              <Skeleton width={500} height={600} variant="rectangular" />
              <Skeleton width={500} height={600} variant="rectangular" />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Profile;
