import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { deletePost } from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/system";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const togglePopover = () => setOpenPopover(!openPopover);

  const deleteUserPost = (e) => {
    e.preventDefault();
    dispatch(deletePost({ postId: post.id }));
  };

  return (
    <Card sx={{ width: "500px" }}>
      <CardHeader
        avatar={<Avatar src={post.User.profilePicture} />}
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
