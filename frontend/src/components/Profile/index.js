import { Avatar, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetch } from "../../store/csrf";
import { getProfilePosts } from "../../store/post";
import PostCard from "../PostCard";

const useStyles = makeStyles(() => ({
  root: {
    padding: "100px 50px",
    margin: "0 auto",
    maxWidth: "1200px",
  },
  profileBox: {
    top: "85px",
    height: "100%",
    maxWidth: "500px",
    padding: "30px 25px",
    position: "sticky",
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();
  const { userId } = useParams();
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
              align="right"
            >
              {userProfile.username}
            </Typography>
          </Stack>

          <Typography color="secondary" align="left" paragraph variant="body2">
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
            <Box width={550} key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
      </Stack>
    </Stack>
  );
};

export default Profile;
