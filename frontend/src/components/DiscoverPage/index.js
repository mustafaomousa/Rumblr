import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import "./index.css";
import CreatePost from "../CreatePost";
import PostCard from "../PostCard";

const FeedPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts.allPosts);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <Stack className="DiscoverPage" spacing={5}>
      <CreatePost user={sessionUser} />
      {posts && posts.map((post) => <PostCard post={post} />)}
    </Stack>
  );
};

export default FeedPage;
