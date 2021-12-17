import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useSelector } from "react-redux";
import { useState } from "react";
import DeletePost from "./DeletePost";
import EditPost from "../EditPost";
import Notification from "../Notification";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
  },
  cardHeader: {
    backgroundColor: "#333A56",
  },
}));

const PostCard = ({ post }) => {
  const classes = useStyles();
  const sessionUser = useSelector((state) => state.session.user);

  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const closeAlertUpdateBodySuccess = () => setSuccessNotificationOpen(false);
  const alertUpdateBodySuccess = () => setSuccessNotificationOpen(true);
  const closeProfileDrawer = () => setProfileDrawerOpen(false);
  const openProfileDrawer = () => setProfileDrawerOpen(true);
  const closeEditOpen = () => setEditOpen(false);
  const openEditOpen = () => setEditOpen(true);

  return (
    <Grid container direction="row" justifyContent="flex-end" spacing={2}>
      <Grid item>
        <Link href={`/user/${post.User.username}`}>
          <Avatar
            variant="square"
            src={post.User.profilePicture}
            sx={{ height: 60, width: 60 }}
          />
        </Link>
      </Grid>
      <Grid item>
        <Card className={classes.root}>
          <Notification
            open={successNotificationOpen}
            handleClose={closeAlertUpdateBodySuccess}
            message={"Post updated"}
          />
          <CardHeader
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
              <Typography>{post.body}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostCard;
