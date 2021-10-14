import { FormControl, IconButton, TextField } from "@mui/material";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/post";
import Notification from "../Notification";

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
    <form
      style={{ width: "100%", display: "flex", flexDirection: "row" }}
      className="EditPost"
      onSubmit={onSubmit}
    >
      <TextField
        placeholder="Edit body"
        id="edit-post-input"
        fullWidth
        multiline
        color="info"
        value={body}
        onChange={updateBody}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <IconButton type="submit">
          <ArrowForwardTwoToneIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default EditPost;
