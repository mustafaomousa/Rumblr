import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SmartButtonIcon from "@mui/icons-material/PushPin";
import HeartButtonIcon from "@mui/icons-material/ThumbUp";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import DeletePost from "../DeletePost";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import ProfileDrawer from "../ProfileDrawer";
import { Box } from "@mui/system";
import EditPost from "../EditPost";
import Notification from "../Notification";

const PostCard = ({ post }) => {
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
    <Card sx={{ maxWidth: "470px", borderRadius: "0.1em" }}>
      <Notification
        open={successNotificationOpen}
        handleClose={closeAlertUpdateBodySuccess}
        message={"Post updated"}
      />
      <ProfileDrawer
        userId={post.userId}
        profileDrawerOpen={profileDrawerOpen}
        closeProfileDrawer={closeProfileDrawer}
      />
      <CardHeader
        avatar={
          <Avatar src={post.User.profilePicture} onClick={openProfileDrawer} />
        }
        action={
          sessionUser.id === post.User.id && (
            <>
              <IconButton aria-describedby="delete-post">
                <DeletePost postId={post.id} />
              </IconButton>

              {editOpen ? (
                <IconButton onClick={closeEditOpen}>
                  <CancelTwoToneIcon sx={{ color: "red" }} />
                </IconButton>
              ) : (
                <IconButton onClick={openEditOpen}>
                  <EditIcon />
                </IconButton>
              )}
            </>
          )
        }
        title={post.User.username}
      />
      <CardMedia
        component="img"
        // height="00px"
        image={post.content}
        alt="image"
      />
      <CardContent>
        {editOpen ? (
          <EditPost
            post={post}
            closeEditOpen={closeEditOpen}
            alertUpdateBodySuccess={alertUpdateBodySuccess}
          />
        ) : (
          <Typography variant="body1">{post.body}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
