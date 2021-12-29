import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";
import {
  Stack,
  Grid,
  Skeleton,
  Box,
  Avatar,
  Link,
  CircularProgress,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PostCard from "../PostCard";
import { getPosts } from "../../store/post";
import CheckoutPost from "./CheckoutPost";
import NewestMembers from "./NewestMembers";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px 0px",
    flexDirection: isMobile && "column-reverse",
    alignItems: isMobile && "center",
    [theme.breakpoints.only("sm")]: {
      flexDirection: "column-reverse",
    },
    [theme.breakpoints.only("xs")]: {
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
    justifyContent: !isMobile && "flex-end",
    [theme.breakpoints.only("sm")]: {
      justifyContent: "center",
      marginLeft: -50,
    },
    paddingRight: !isMobile && 10,
  },
  extrasContainer: {
    [theme.breakpoints.only("sm")]: {
      justifyContent: "center",
      width: "100%",
      paddingRight: 30,
      paddingBottom: 30,
    },
    paddingLeft: !isMobile && 10,
    paddingBottom: isMobile && 30,
  },
  avatarBox: {
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
  extrasStack: {
    maxWidth: 500,
    [theme.breakpoints.only("sm")]: {
      alignItems: "center",
      maxWidth: 500,
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
    <Grid className={classes.root} container direction="row">
      <Grid item container sm={12} md={6} className={classes.postContainer}>
        {posts ? (
          <Stack spacing={3} height="100%">
            {posts.map((post) => {
              return (
                <Stack direction="row" key={post.id}>
                  <Box sx={{ padding: "0 15px" }} display={isMobile && "none"}>
                    <Link href={`/user/${post.User.id}`}>
                      <Avatar
                        src={post.User.profilePicture}
                        variant="square"
                        className={classes.stickyAvatar}
                      />
                    </Link>
                  </Box>
                  <Box maxWidth={500}>
                    <PostCard key={post.id} post={post} />
                  </Box>
                </Stack>
              );
            })}
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              paddingTop={5}
              sx={{ display: morePostsLoading ? "" : "none" }}
            >
              <CircularProgress color="secondary" />
            </Stack>
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
        <Stack spacing={3} width="100%" className={classes.extrasStack}>
          <NewestMembers />
          {!isMobile && <CheckoutPost />}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Discover;
