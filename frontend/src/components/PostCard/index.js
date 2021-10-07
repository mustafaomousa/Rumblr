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
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { deletePost } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const closeProfileDrawer = () => setProfileDrawerOpen(false);
  const openProfileDrawer = () => setProfileDrawerOpen(true);
  const deleteUserPost = (e) => {
    e.preventDefault();
    dispatch(deletePost({ postId: post.id }));
  };

  return (
    <Card sx={{ width: "500px" }}>
      <ProfileDrawer
        userId={post.User.id}
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
              <IconButton aria-describedby="test">
                <DeleteIcon onClick={deleteUserPost} />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
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
        <Typography>{post.body}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <SmartButtonIcon />
          </IconButton>
        </div>
        <div style={{ overflow: "scroll" }}>
          {post.Tags.map((tag) => (
            <Button size="small">
              <Typography>{tag.name}</Typography>
            </Button>
          ))}
        </div>
      </CardActions>
    </Card>
  );
};

export default PostCard;
