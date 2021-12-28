import {
  Avatar,
  Button,
  Divider,
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

const useStyles = makeStyles(() => ({
  root: {
    padding: "100px 50px",
    margin: "0 auto",
    maxWidth: "1200px",
  },
  profileBox: {
    top: "85px",
    width: "100%",
    padding: "30px 25px",
    position: "sticky",
    backgroundColor: "rgba(0, 0, 0, 0.11)",
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
      <Grid item xs={5}>
        {userProfile && (
          <Stack className={classes.profileBox} spacing={2}>
            <Stack direction="column" alignItems="center" spacing={2}>
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
              <Typography
                color="secondary"
                variant="h3"
                paragraph
                margin={0}
                align="right"
              >
                {userProfile.username}
              </Typography>
            </Stack>
            <Divider />
            <Typography
              color="secondary"
              align="left"
              paragraph
              variant="body2"
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
          </Stack>
        )}
      </Grid>
      <Grid item xs={7}>
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
