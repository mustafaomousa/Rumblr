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
import { useSelector } from "react-redux";
const QuickAction = () => {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <Box>
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={createPostVisible}
        onClose={() => setCreatePostVisible(false)}
        children={
          <CreatePost
            user={sessionUser}
            setCreatePostVisible={setCreatePostVisible}
          />
        }
      />
      <SpeedDial
        ariaLabel="Hello"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Hi"
          icon={<CreateIcon />}
          tooltipTitle="Make a post"
          onClick={() => setCreatePostVisible(true)}
        />
      </SpeedDial>
    </Box>
  );
};

export default QuickAction;
