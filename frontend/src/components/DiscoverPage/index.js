import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import "./index.css";
import PostCard from "../PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "../../store/post";

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
      <Stack className="DiscoverPage" spacing={5}>
        {Object.keys(posts).map((idx) => {
          return <PostCard post={posts[idx]} />;
        })}
        <Button sx={{ color: "white" }} onClick={increaseLimit}>
          Load more
        </Button>
      </Stack>
    )
  );
};

export default FeedPage;
