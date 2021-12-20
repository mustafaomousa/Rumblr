import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
    maxWidth: "1200px",
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
    <Stack className={classes.root} alignItems="center">
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardHeader
          avatar={
            userProfile ? (
              <Avatar src={userProfile.profilePicture} />
            ) : (
              <Skeleton width="30px" height="50px" />
            )
          }
          title={
            userProfile ? (
              <Typography>{userProfile.username}</Typography>
            ) : (
              <Skeleton height={50} width={150} />
            )
          }
        />
        <Divider />
        <CardContent>
          {userProfile ? (
            <>
              <Typography variant="h5" gutterBottom={3}>
                {userProfile.username}'s bio
              </Typography>
              <Typography gutterBottom={6}>{userProfile.bio}</Typography>
            </>
          ) : (
            <>
              <Skeleton width={200} height={50} />
              <Skeleton height={50} />
            </>
          )}
        </CardContent>
      </Card>
      <Stack marginTop={3} spacing={3} alignItems="center" direction="column">
        {userProfile &&
          userProfile.Posts.map((post) => (
            <PostCard post={post} width={"100%"} />
          ))}
      </Stack>
    </Stack>
  );
};

export default Profile;
