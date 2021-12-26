import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../store/post";

const EditPost = ({ post, closeEditOpen, notificationRef }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(post.body);
  const updateBody = (e) => setBody(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePost({ postId: post.id, body }));
    notificationRef.current.toggleNotification({
      message: "Post updated!",
      severity: "success",
    });

    return closeEditOpen();
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <FormControl>
          <TextField
            InputProps={{ sx: { backgroundColor: "#e8e8e8" } }}
            fullWidth
            multiline
            value={body}
            onChange={updateBody}
          />
        </FormControl>
        <FormControl>
          <Stack alignItems="flex-end">
            <Button size="small" type="submit" variant="contained">
              <Typography marginRight={1} variant="body2">
                Update Post
              </Typography>
              <ArrowForwardTwoToneIcon />
            </Button>
          </Stack>
        </FormControl>
      </Stack>
    </form>
  );
};

export default EditPost;
