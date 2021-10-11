import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import "./index.css";
import CreatePost from "../CreatePost";
import PostCard from "../PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "../../store/post";
import QuickAction from "../QuickAction";

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
        {/* <CreatePost user={sessionUser} /> */}
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
