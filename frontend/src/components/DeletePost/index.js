import { Button, IconButton, Popover, Typography } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deletePost } from "../../store/post";
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

  const deleteUserPost = () => dispatch(deletePost({ postId }));

  return (
    <>
      <Delete
        aria-describedby="delete-post"
        variant="contained"
        onClick={openPopover}
      />
      <Popover
        id="delete-post"
        open={popoverOpen}
        onClose={closePopover}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            sx={{ backgroundColor: "red" }}
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
