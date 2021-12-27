import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DeletePost from "./DeletePost";
import moment from "moment";
import EditPost from "./EditPost";
import Notification from "../Notification";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import { likeUserPost, removeLike } from "../../store/post";
import useNotification from "../Notification/useNotification";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 0,
  },
  cardHeader: {
    backgroundColor: "#53648F",
  },
}));

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeEditOpen = () => setEditOpen(false);
  const openEditOpen = () => setEditOpen(true);

  const notificationRef = useNotification();

  const like = async (postUser) => {
    setIsLoading(true);
    await dispatch(likeUserPost(post.id, sessionUser.id)).then(() => {
      setIsLoading(false);
    });
    notificationRef.current.toggleNotification({
      message: `You liked ${postUser}'s post!`,
      severity: "success",
    });
  };

  const dislike = async (like) => {
    setIsLoading(true);
    await dispatch(removeLike(like)).then(() => setIsLoading(false));
  };

  return (
    <Card className={classes.root} elevation={0}>
      <Notification ref={notificationRef} />
      <CardHeader
        avatar={
          window.location.pathname !== "/discover" && (
            <Link href={`/user/${post.User.id}`}>
              <Avatar
                variant="square"
                src={post.User.profilePicture}
                sx={{
                  height: 40,
                  width: 40,
                  backgroundColor: post.User.profilePicture && "#BDBDBD",
                }}
              />
            </Link>
          )
        }
        className={classes.cardHeader}
        action={
          sessionUser.id === post.User.id && (
            <Stack direction="row" align justifyContent={"center"} spacing={1}>
              <Button
                variant="outlined"
                aria-describedby="delete-post"
                color="secondary"
              >
                <DeletePost postId={post.id} />
              </Button>
              {editOpen ? (
                <Button onClick={closeEditOpen} color="secondary">
                  <CancelTwoToneIcon color="warning" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={openEditOpen}
                  color="secondary"
                >
                  <EditIcon />
                </Button>
              )}
            </Stack>
          )
        }
        title={
          <Link
            underline="hover"
            href={`/user/${post.User.id}`}
            fontSize="medium"
            color="#ffffff"
          >
            {post.User.username}
          </Link>
        }
      />
      <CardMedia component="img" image={post.content} alt="image" />
      <Divider />
      <CardContent sx={{ background: "#53648F" }}>
        {editOpen ? (
          <EditPost
            notificationRef={notificationRef}
            post={post}
            closeEditOpen={closeEditOpen}
          />
        ) : (
          <Box>
            <Typography
              variant="body1"
              sx={{ wordWrap: "break-word" }}
              paragraph
              color="secondary"
            >
              {post.body}
            </Typography>
          </Box>
        )}
      </CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        padding={1}
        sx={{ background: "#53648F" }}
      >
        <Stack direction="row" spacing={1}>
          {!isLoading ? (
            <Button
              color="warning"
              variant={post.Liked ? "contained" : "outlined"}
              size="small"
              onClick={
                post.Liked
                  ? () => dislike(post.Likes[0])
                  : () => like(post.User.username)
              }
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {post.Liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              {post.Likes && post.Likes.length > 0 && post.Likes.length}
            </Button>
          ) : (
            <Box paddingLeft={0.5}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Stack>
        <Typography color="secondary" variant="caption">
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </Typography>
      </Stack>
    </Card>
  );
};

export default PostCard;
