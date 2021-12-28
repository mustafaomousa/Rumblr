import { Button, Popover } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deletePost } from "../../../store/post";
import { useDispatch } from "react-redux";

import { useRef, useState } from "react";
import { Box } from "@mui/system";
import Notification from "../../Notification";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();
  const notificationRef = useRef();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);

  const closePopover = () => setPopoverOpen(false);
  const openPopover = (e) => {
    setPopoverOpen(true);
    setAnchorElement(e.currentTarget);
  };

  const deleteUserPost = async (e) => {
    e.preventDefault();
    await dispatch(deletePost({ postId, notificationRef }));
    closePopover();
  };

  return (
    <>
      <Notification ref={notificationRef} />
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
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "5px",
          }}
        >
          <Button
            color="warning"
            sx={{ mr: "10px" }}
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
    </>
  );
};

export default DeletePost;
