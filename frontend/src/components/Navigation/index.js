import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Button,
  Stack,
  AppBar,
  Grid,
  Link,
  IconButton,
  Modal,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonRounded";
import HelpIcon from "@mui/icons-material/Help";
import * as sessionActions from "../../store/session";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Box } from "@mui/system";
import Notification from "../Notification";
import CreatePost from "../CreatePost";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "0 30px",
    height: 60,
  },
  searchInput: {
    width: 200,
  },
  userIcon: {
    minWidth: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const closeAlertCreatePostSuccess = () => setSuccessNotificationOpen(false);
  const alertCreatePostSuccess = () => setSuccessNotificationOpen(true);

  const handleLogout = async () => {
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Link
            href="/discover"
            fontSize="35px"
            fontWeight="bold"
            color="secondary"
            underline="none"
          >
            R
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Stack
            width="100%"
            direction="row"
            height="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button href="/discover" color="secondary">
              <HomeIcon />
            </Button>
            <Button href="/about" color="secondary">
              <HelpIcon />
            </Button>
            <Button
              size="small"
              id="user-button"
              aria-controls="user-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={classes.userIcon}
              variant="outlined"
              color="secondary"
            >
              <PersonIcon />
              <Typography marginLeft={0.5}>{sessionUser.username}</Typography>
            </Button>{" "}
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "user-button",
              }}
              PaperProps={{}}
              sx={{ marginTop: 1 }}
            >
              <Stack
                direction="row"
                padding="0px 20px"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  variant="square"
                  sx={{ width: 100, height: 100 }}
                  src={sessionUser.profilePicture}
                />
                <Stack alignItems="center">
                  <MenuItem sx={{ width: "100%" }}>Profile</MenuItem>
                  <MenuItem sx={{ width: "100%" }}>My account</MenuItem>
                  <MenuItem sx={{ width: "100%" }} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Stack>
              </Stack>
            </Menu>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => setCreatePostVisible(true)}
            >
              <AddCircleOutlineIcon />
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
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;
