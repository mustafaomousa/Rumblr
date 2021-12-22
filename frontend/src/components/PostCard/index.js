import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeletePost from "./DeletePost";
import moment from "moment";
import EditPost from "./EditPost";
import Notification from "../Notification";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Box } from "@mui/system";
import { fetch } from "../../store/csrf";

const useStyles = makeStyles(() => ({
  root: {
    width: 450,
  },
  cardHeader: {
    backgroundColor: "#53648F",
  },
}));

const PostCard = (props) => {
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);

  const [post, setPost] = useState(props.post);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const closeAlertUpdateBodySuccess = () => setSuccessNotificationOpen(false);
  const alertUpdateBodySuccess = () => setSuccessNotificationOpen(true);
  const closeEditOpen = () => setEditOpen(false);
  const openEditOpen = () => setEditOpen(true);
  // const like = () => setLiked(true);
  // const dislike = () => setLiked(false);

  const like = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify({ postId: post.id, userId: sessionUser.id }),
    });

    if (res.ok) {
      return setPost({ ...post, Likes: [res.data.like] });
    }
  };

  const dislike = async (likeId) => {
    const res = await fetch("/api/likes", {
      method: "DELETE",
      body: JSON.stringify({ likeId }),
    });

    if (res.ok) {
      return setPost({ ...post, Likes: [] });
    }
  };

  return (
    <Card className={classes.root}>
      <Notification
        open={successNotificationOpen}
        handleClose={closeAlertUpdateBodySuccess}
        message={"Post updated"}
      />
      <CardHeader
        avatar={
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
        }
        className={classes.cardHeader}
        action={
          sessionUser.id === post.User.id && (
            <>
              <IconButton aria-describedby="delete-post" color="secondary">
                <DeletePost postId={post.id} />
              </IconButton>
              {editOpen ? (
                <IconButton onClick={closeEditOpen} color="secondary">
                  <CancelTwoToneIcon color="warning" />
                </IconButton>
              ) : (
                <IconButton onClick={openEditOpen} color="secondary">
                  <EditIcon />
                </IconButton>
              )}
            </>
          )
        }
        title={
          <Link
            underline="hover"
            href={`/user/${post.User.id}`}
            fontWeight="bold"
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
            post={post}
            closeEditOpen={closeEditOpen}
            alertUpdateBodySuccess={alertUpdateBodySuccess}
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
          <Button variant="contained" size="small">
            <CommentIcon />
          </Button>
          <Button
            color="warning"
            variant={post.Likes.length ? "contained" : "outlined"}
            size="small"
            onClick={post.Likes.length ? () => dislike(post.Likes[0].id) : like}
          >
            {post.Likes.length ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </Stack>
        <Typography color="secondary" variant="caption">
          {moment(post.createdAt).format("MMMM DD, YYYY")}
        </Typography>
      </Stack>
    </Card>
  );
};

export default PostCard;
