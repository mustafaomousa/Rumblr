import {
  Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/system";
import { useState } from "react";
import CreatePost from "../CreatePost";
import { useDispatch, useSelector } from "react-redux";
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
          children={
            <CreatePost
              user={sessionUser}
              setCreatePostVisible={setCreatePostVisible}
              alertCreatePostSuccess={alertCreatePostSuccess}
            />
          }
        />
        <SpeedDial
          ariaLabel="Hello"
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
          }}
          icon={<CreateIcon />}
          onClick={() => setCreatePostVisible(true)}
        />
      </Box>
    );

  return null;
};

export default QuickAction;
