import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Card, CardHeader, Stack, Typography } from "@mui/material";

import PostCard from "../PostCard";
import { getPosts } from "../../store/post";

import "./index.css";

const FeedPage = () => {
  const dispatch = useDispatch();
  const [loadLimit, setLoadLimit] = useState(5);

  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  const increaseLimit = () => setLoadLimit(loadLimit + 5);

  useEffect(() => {
    dispatch(getPosts(loadLimit, sessionUser.id));
  }, [dispatch, loadLimit]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    posts && (
      <div className="discover-page">
        <Stack spacing={2} className="discover-page-posts">
          {Object.keys(posts).map((idx) => {
            return <PostCard post={posts[idx]} />;
          })}
          {Object.keys(posts).length % 5 === 0 && (
            <Button variant="outlined" onClick={increaseLimit}>
              Load more
            </Button>
          )}
        </Stack>
        <Stack spacing={10} className="discover-page-side">
          <Card
            className="discover-page-side-newest-members"
            variant="outlined"
          >
            <CardHeader
              align="center"
              title={<Typography>Our newest members</Typography>}
            />
          </Card>
          <Card className="discover-page-side-post" variant="outlined">
            <CardHeader
              align="center"
              title={<Typography>Check this out</Typography>}
            />
          </Card>
        </Stack>
      </div>
    )
  );
};

export default FeedPage;
