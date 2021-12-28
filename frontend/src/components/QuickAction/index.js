import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CreatePost from "../CreatePost";
import { useSelector } from "react-redux";
import Notification from "../Notification";

const QuickAction = () => {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const closeAlertCreatePostSuccess = () => setSuccessNotificationOpen(false);
  const alertCreatePostSuccess = () => setSuccessNotificationOpen(true);

  if (sessionUser)
    return (
      <Box>
        <Notification
          open={successNotificationOpen}
          handleClose={closeAlertCreatePostSuccess}
          message={"Post created"}
        />
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={createPostVisible}
          onClose={() => setCreatePostVisible(false)}
        >
          <CreatePost
            user={sessionUser}
            setCreatePostVisible={setCreatePostVisible}
            alertCreatePostSuccess={alertCreatePostSuccess}
          />
        </Modal>
      </Box>
    );

  return null;
};

export default QuickAction;
