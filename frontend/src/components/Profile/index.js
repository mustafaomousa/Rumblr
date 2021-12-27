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
import { Masonry } from "@mui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "100px 50px",
    margin: "0 auto",
    maxWidth: "1200px",
  },
  profileBox: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "85px",
    height: "100%",
    maxWidth: "500px",
    // backgroundColor: "#53648F",
    padding: "30px 25px",
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
    <Stack direction="row" className={classes.root} spacing={3}>
      {userProfile && (
        <Stack className={classes.profileBox} spacing={2}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
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
              align="end"
            >
              {userProfile.username}
            </Typography>
          </Stack>

          <Typography
            color="secondary"
            align="start"
            paragraph
            variant="body2"
            align="start"
          >
            {userProfile.bio}
          </Typography>
        </Stack>
      )}
      <Stack
        width={600}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {userPosts &&
          userPosts.map((post) => (
            <Box width={550}>
              <PostCard post={post} />
            </Box>
          ))}
      </Stack>
    </Stack>
  );
};

export default Profile;
