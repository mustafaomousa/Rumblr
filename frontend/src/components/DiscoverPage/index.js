import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PostCard from "../PostCard";
import { getPosts } from "../../store/post";

import "./index.css";
import { getNewestUsers } from "../../store/discover";
import { Box } from "@mui/system";

const FeedPage = () => {
  const dispatch = useDispatch();
  const [loadLimit, setLoadLimit] = useState(5);

  const sessionUser = useSelector((state) => state.session.user);
  const newestUsers = useSelector((state) => state.discover.newestUsers);
  const posts = useSelector((state) => state.posts);

  const increaseLimit = () => setLoadLimit(loadLimit + 5);

  useEffect(() => {
    dispatch(getPosts(loadLimit, sessionUser.id));
    dispatch(getNewestUsers());
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
            <CardContent>
              {newestUsers &&
                newestUsers.map((newestUser) => {
                  return (
                    <Button
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "5px",
                      }}
                    >
                      <Avatar src={newestUser.profilePicture} />
                      <Typography>{newestUser.username}</Typography>
                      <Divider />
                    </Button>
                  );
                })}
            </CardContent>
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
