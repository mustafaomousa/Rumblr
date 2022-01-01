import { Skeleton, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post";

import { getRandomPost } from "../../store/post";

const useStyles = makeStyles(() => ({
  root: { maxWidth: 500 },
}));

const CheckoutPost = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const randomPost = useSelector((state) => state.posts.randomPost);

  useEffect(() => dispatch(getRandomPost()), [dispatch]);

  return randomPost ? (
    <Stack spacing={2} className={classes.root}>
      <Typography fontWeight="bold" color="#ffffff">
        Checkout this post by {randomPost.User.username}
      </Typography>
      <Post post={randomPost} />
    </Stack>
  ) : (
    <Stack spacing={1} width="100%">
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        maxHeight={30}
      />
      <Skeleton animation="wave" variant="rectangular" maxHeight={500} />
    </Stack>
  );
};

export default CheckoutPost;
