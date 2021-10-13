import {
  Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import ExitIcon from "@mui/icons-material/ExitToApp";
import CreateIcon from "@mui/icons-material/Create";
import { Box } from "@mui/system";
import { useState } from "react";
import CreatePost from "../CreatePost";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

const QuickAction = () => {
  const dispatch = useDispatch();
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logout());
    // return history.push("/");
  };

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
        <SpeedDialAction
          key="Hi"
          icon={<ExitIcon />}
          tooltipTitle="Log out"
          onClick={handleLogout}
        />
      </SpeedDial>
    </Box>
  );
};

export default QuickAction;
