import { Button, IconButton, Popover, Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deletePost } from "../../../store/post";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { Box } from "@mui/system";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const closePopover = () => setPopoverOpen(false);
  const openPopover = (e) => {
    setPopoverOpen(true);
    setAnchorElement(e.currentTarget);
  };

  const deleteUserPost = async () =>
    await dispatch(deletePost({ postId })).then(() => closePopover());

  return (
    <>
      {/* Delete icon that is located next to the edit icon on a post card  */}
      <Delete
        aria-describedby="delete-post"
        variant="contained"
        onClick={openPopover}
      />
      {/* Popover opens whenever the Delete icon above is clicked */}
      <Popover
        id="delete-post"
        open={popoverOpen}
        onClose={closePopover}
        anchorEl={anchorElement}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "5px",
          }}
        >
          <Button
            sx={{ backgroundColor: "red", mr: "10px" }}
            variant="contained"
            onClick={deleteUserPost}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={closePopover}>
            Cancel
          </Button>
        </Box>
      </Popover>
      {/* <Delete onClick={openPopover} /> */}
    </>
  );
};

export default DeletePost;
