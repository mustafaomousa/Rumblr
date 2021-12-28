import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
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
import useBottomScrollListener from "../useBottomScrollListener";

const useStyles = makeStyles(() => ({
  root: {
    margin: "95px 0px",
  },
  stickyAvatar: {
    position: "-webkit-sticky",
    position: "sticky",
    top: "65px",
    height: "60px",
    width: "60px",
    backgroundColor: "#e8e8e8",
  },
}));

const Discover = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadLimit, setLoadLimit] = useState(5);
  const [morePostsLoading, setMorePostsLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts.loadedPosts);
  const increaseLimit = () => setLoadLimit(loadLimit + 5);

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
    setMorePostsLoading(false);
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
      <Grid item xs={12} md={6}>
        {posts ? (
          <Stack alignItems={"flex-end"} spacing={3} height="100%">
            {posts.map((post) => {
              return (
                <Stack direction="row">
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
      <Grid item xs={12} md={6}>
        <Stack spacing={3} className={classes.wigits}>
          <NewestMembers />
          <CheckoutPost />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Discover;
