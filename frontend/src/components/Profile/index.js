import {
  Avatar,
  Button,
  Grid,
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
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PostCard from "../PostCard";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px 0px",
  },
  profileBox: {
    top: "85px",
    width: "500px",
    position: "sticky",
    [theme.breakpoints.only("sm")]: {
      width: "100%",
    },
  },
  userPostsContainer: {
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
    <Grid container direction="row" className={classes.root} spacing={2}>
      <Grid item container sm={12} md={6} justifyContent="flex-end">
        {userProfile && (
          <Box>
            <Box className={classes.profileBox}>
              <Stack direction="row" alignItems="flex-end" spacing={2}>
                <Avatar
                  variant="square"
                  src={userProfile.profilePicture}
                  sx={{
                    height: 150,
                    width: 150,
                    objectFit: "contain",
                    backgroundColor: "#e8e8e8",
                  }}
                />
                <Typography color="secondary" variant="h4">
                  {userProfile.username}
                </Typography>
              </Stack>
              <br />
              <Typography
                color="secondary"
                align="start"
                paragraph
                variant="body1"
              >
                {userProfile.bio}
              </Typography>
              <Stack alignItems={"flex-end"}>
                {sessionUser.username === userProfile.username && (
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    onClick={() => history.push("/settings")}
                  >
                    Edit
                  </Button>
                )}
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
        <Stack
          width={600}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {userPosts ? (
            userPosts.length ? (
              userPosts.map((post) => (
                <Box width={500} key={post.id}>
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
