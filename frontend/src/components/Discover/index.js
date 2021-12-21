import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Stack, Grid, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PostCard from "../PostCard";
import { getPosts } from "../../store/post";
import CheckoutPost from "./CheckoutPost";
import NewestMembers from "./NewestMembers";
import { useTheme } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "120px 0",
  },
}));

const Discover = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [loadLimit, setLoadLimit] = useState(5);

  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  const increaseLimit = () => setLoadLimit(loadLimit + 5);

  useEffect(() => {
    if (!sessionUser) return <Redirect to="/" />;
    dispatch(getPosts(loadLimit, sessionUser.id));
  }, [dispatch, loadLimit]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <Grid className={classes.root} container direction="row">
      <Grid item xs={12} md={6}>
        {posts && (
          <Stack alignItems={"flex-end"}>
            {Object.keys(posts).map((idx) => {
              return <PostCard key={idx} post={posts[idx]} />;
            })}
            {Object.keys(posts).length % 5 === 0 && (
              <Button variant="contained" onClick={increaseLimit}>
                Load more
              </Button>
            )}
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
