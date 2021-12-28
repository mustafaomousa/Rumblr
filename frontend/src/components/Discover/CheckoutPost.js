import { Skeleton, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../PostCard";

import { getRandomPost } from "../../store/post";

const useStyles = makeStyles(() => ({
  root: {
    width: "500px",
  },
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
      <PostCard post={randomPost} />
    </Stack>
  ) : (
    <Stack spacing={1} className={classes.root}>
      <Skeleton animation="wave" variant="rectangular" height={30} />
      <Skeleton animation="wave" variant="rectangular" height={500} />
    </Stack>
  );
};

export default CheckoutPost;
