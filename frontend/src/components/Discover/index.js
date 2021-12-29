import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Stack,
  Grid,
  Skeleton,
  Box,
  Avatar,
  Link,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PostCard from "../PostCard";
import { getPosts } from "../../store/post";
import CheckoutPost from "./CheckoutPost";
import NewestMembers from "./NewestMembers";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "95px 0px",
    [theme.breakpoints.only("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  stickyAvatar: {
    position: "sticky",
    top: "65px",
    height: "60px",
    width: "60px",
    backgroundColor: "#e8e8e8",
  },
  postContainer: {
    justifyContent: "flex-end",
    [theme.breakpoints.only("sm")]: {
      justifyContent: "center",
      marginLeft: -50,
    },
  },
  extrasContainer: {
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
}));

const Discover = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadLimit, setLoadLimit] = useState(5);
  const [morePostsLoading, setMorePostsLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts.loadedPosts);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setMorePostsLoading(true);
      setLoadLimit(loadLimit + 5);
    }
  };

  useEffect(() => {
    if (!sessionUser) return <Redirect to="/" />;
    dispatch(getPosts(loadLimit));
  }, [dispatch, loadLimit, sessionUser]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <Grid className={classes.root} container direction="row" spacing={2}>
      <Grid item container sm={12} md={6} className={classes.postContainer}>
        {posts ? (
          <Stack spacing={3} height="100%">
            {posts.map((post) => {
              return (
                <Stack direction="row" key={post.id}>
                  <Box sx={{ padding: "0 15px" }}>
                    <Link href={`/user/${post.User.id}`}>
                      <Avatar
                        src={post.User.profilePicture}
                        variant="square"
                        className={classes.stickyAvatar}
                      />
                    </Link>
                  </Box>
                  <Box width={500}>
                    <PostCard key={post.id} post={post} />
                  </Box>
                </Stack>
              );
            })}
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              width={500}
              paddingTop={5}
              sx={{ display: morePostsLoading ? "" : "none" }}
            >
              <CircularProgress color="secondary" />
            </Stack>

            {/* {Object.keys(posts).length % 5 === 0 && (
              <Button
                disableElevation
                color="secondary"
                variant="contained"
                onClick={increaseLimit}
                sx={{ width: 500, marginRight: "10px" }}
              >
                Load more
              </Button>
            )} */}
          </Stack>
        ) : (
          <Stack spacing={3} alignItems="flex-end">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={500}
              width={500}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={500}
              width={500}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height={500}
              width={500}
            />
          </Stack>
        )}
      </Grid>
      <Grid item container sm={12} md={6} className={classes.extrasContainer}>
        <Stack spacing={3} className={classes.wigits}>
          <NewestMembers />
          <CheckoutPost />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Discover;
