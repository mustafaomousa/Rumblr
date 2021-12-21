import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRandomPost } from "../../store/discover";

const useStyles = makeStyles(() => ({
  root: {
    width: "500px",
  },
  cardHeader: {
    backgroundColor: "#333A56",
  },
}));

const CheckoutPost = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const randomPost = useSelector((state) => state.discover.randomPost);

  useEffect(() => {
    dispatch(getRandomPost());
  }, []);

  return (
    <Card className={classes.root}>
      {randomPost && (
        <>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Typography fontWeight="bold" color="#ffffff">
                Checkout this post by {randomPost.User.username}
              </Typography>
            }
          />
          <CardMedia component="img" src={randomPost.content} />
          <CardContent>{randomPost.body}</CardContent>
        </>
      )}
    </Card>
  );
};

export default CheckoutPost;
