import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRandomPost } from "../../store/discover";

const CheckoutPost = () => {
  const dispatch = useDispatch();

  const randomPost = useSelector((state) => state.discover.randomPost);

  useEffect(() => {
    dispatch(getRandomPost());
  }, []);

  if (randomPost)
    return (
      <div>
        <Card
          className="discover-page-side-post"
          variant="outlined"
          sx={{ borderRadius: "0.1em" }}
        >
          <CardHeader
            align="center"
            title={
              <Typography>
                Check out this post by {randomPost.User.username}
              </Typography>
            }
          />
          <CardMedia component="img" src={randomPost.content} />
          <CardContent>{randomPost.body}</CardContent>
        </Card>
      </div>
    );
  else return <CircularProgress />;
};

export default CheckoutPost;
