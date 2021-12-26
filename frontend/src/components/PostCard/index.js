import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
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
import { fetch } from "../../store/csrf";
import { likeUserPost, removeLike } from "../../store/post";

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
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

  // const [post, setPost] = useState(props.post);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const closeAlertUpdateBodySuccess = () => setSuccessNotificationOpen(false);
  const alertUpdateBodySuccess = () => setSuccessNotificationOpen(true);
  const closeEditOpen = () => setEditOpen(false);
  const openEditOpen = () => setEditOpen(true);

  const like = () => dispatch(likeUserPost(post.id, sessionUser.id));

  const dislike = (like) => {
    dispatch(removeLike(like));
  };

  return (
    <Card className={classes.root} elevation={0}>
      <Notification
        open={successNotificationOpen}
        handleClose={closeAlertUpdateBodySuccess}
        message={"Post updated"}
      />
      <CardHeader
        sx={{ height: 30 }}
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
            <Stack direction="row" align justifyContent={"center"}>
              <Button aria-describedby="delete-post" color="secondary">
                <DeletePost postId={post.id} />
              </Button>
              {editOpen ? (
                <Button onClick={closeEditOpen} color="secondary">
                  <CancelTwoToneIcon color="warning" />
                </Button>
              ) : (
                <Button onClick={openEditOpen} color="secondary">
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
          <Button
            color="warning"
            variant={post.Likes.length ? "contained" : "outlined"}
            size="small"
            onClick={post.Likes.length ? () => dislike(post.Likes[0]) : like}
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
