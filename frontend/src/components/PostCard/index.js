import {
  Avatar,
  Button,
  Card,
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
import EditPost from "./EditPost";
import Notification from "../Notification";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Box } from "@mui/system";

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
    <Card className={classes.root}>
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
      <CardContent>
        {editOpen ? (
          <EditPost
            post={post}
            closeEditOpen={closeEditOpen}
            alertUpdateBodySuccess={alertUpdateBodySuccess}
          />
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ wordWrap: "break-word" }}
                  paragraph
                >
                  {post.body}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" sx={{ marginBottom: 1 }}>
                <CommentIcon />
              </Button>
              <Button
                color="warning"
                variant="outlined"
                onClick={liked ? dislike : like}
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
