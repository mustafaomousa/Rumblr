import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
import EditPost from "./EditPost";
import Notification from "../Notification";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles(() => ({
  root: {
    width: 580,
    margin: "10px 10px",
  },
  cardHeader: {
    backgroundColor: "#333A56",
  },
}));

const PostCard = ({ post, width }) => {
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);

  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const closeAlertUpdateBodySuccess = () => setSuccessNotificationOpen(false);
  const alertUpdateBodySuccess = () => setSuccessNotificationOpen(true);
  const closeEditOpen = () => setEditOpen(false);
  const openEditOpen = () => setEditOpen(true);
  const like = () => setLiked(true);
  const dislike = () => setLiked(false);

  return (
    <Card className={width ? width : classes.root}>
      <Notification
        open={successNotificationOpen}
        handleClose={closeAlertUpdateBodySuccess}
        message={"Post updated"}
      />
      <CardHeader
        avatar={
          <Link href={`/user/${post.User.username}`}>
            <Avatar
              variant="square"
              src={post.User.profilePicture}
              sx={{ height: 60, width: 60 }}
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
                  <CancelTwoToneIcon sx={{ color: "red" }} />
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
            href={`/user/${post.User.username}`}
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
      <CardContent
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {editOpen ? (
          <EditPost
            post={post}
            closeEditOpen={closeEditOpen}
            alertUpdateBodySuccess={alertUpdateBodySuccess}
          />
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
            paddingRight="10px"
          >
            <Typography variant="body1" gutterBottom={10}>
              {post.body}
            </Typography>
            <Button color="warning">
              {liked ? (
                <FavoriteIcon onClick={dislike} />
              ) : (
                <FavoriteBorderIcon onClick={like} />
              )}
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
