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

const EditPost = ({ post, closeEditOpen, alertUpdateBodySuccess }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(post.body);

  const updateBody = (e) => setBody(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ postId: post.id, body }))
      .then(() => alertUpdateBodySuccess())
      .then(() => closeEditOpen())
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack direction="column" spacing={2}>
        <FormControl>
          <TextField
            label="Body"
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
