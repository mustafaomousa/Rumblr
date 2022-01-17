import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Typography,
  Button,
  Stack,
  AppBar,
  Grid,
  Link,
  Modal,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { isMobile } from "react-device-detect";
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
    alignItems: "center",
    padding: isMobile ? "0 10px" : "0 30px",
    height: 55,
    borderBottom: "1px solid #405368",
  },
  searchInput: {
    width: 200,
  },
  userIcon: {
    minWidth: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
}));

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dropdownOpen = Boolean(dropdownAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClick = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  };

  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [successNotificationOpen, setSuccessNotificationOpen] = useState(false);
  const closeAlertCreatePostSuccess = () => setSuccessNotificationOpen(false);
  const alertCreatePostSuccess = () => setSuccessNotificationOpen(true);

  const closeCreatePost = () => setCreatePostVisible(false);

  const handleLogout = async () => {
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar className={classes.root} elevation={0}>
      <Grid container alignItems="center" maxWidth={1680}>
        <Grid item xs={1}>
          <Link
            href="/discover"
            fontSize="35px"
            fontWeight="bold"
            color="secondary"
            underline="none"
          >
            <Button size="small">
              <Typography fontWeight={"bold"} fontSize={20} color="secondary">
                Rumblr
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={11}>
          <Stack
            width="100%"
            direction="row"
            height="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            {!isMobile && (
              <>
                <Button href="/discover" size="small" color="secondary">
                  <HomeIcon />
                </Button>
                <Button href="/about" size="small" color="secondary">
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
                  color="secondary"
                  variant="outlined"
                >
                  <PersonIcon />
                  {sessionUser.username}
                </Button>
              </>
            )}
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "user-button",
              }}
              sx={{ marginTop: 1 }}
            >
              <Stack
                direction="column"
                padding="10px 20px"
                alignItems="center"
                spacing={1}
                width={200}
              >
                <Stack alignItems="center" width="100%">
                  <Link
                    underline="none"
                    href={`/users/${sessionUser.id}`}
                    sx={{ width: "100%" }}
                  >
                    <MenuItem sx={{ width: "100%", justifyContent: "center" }}>
                      Profile
                    </MenuItem>
                  </Link>

                  <Link
                    underline="none"
                    href="/settings"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem sx={{ width: "100%", justifyContent: "center" }}>
                      Settings
                    </MenuItem>
                  </Link>
                  <Divider />
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ marginTop: 5, width: "100%" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Stack>
              </Stack>
            </Menu>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 0 }}
              onClick={() => setCreatePostVisible(true)}
            >
              <AddCircleOutlineIcon />
              <Box>
                <Notification
                  open={successNotificationOpen}
                  handleClose={closeAlertCreatePostSuccess}
                  message={"Post created"}
                />
              </Box>
            </Button>
            {isMobile && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  id="dropdown-button"
                  aria-controls="dropdown-menu"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? "true" : undefined}
                  onClick={handleDropdownClick}
                >
                  <MoreHorizIcon />
                </Button>
                <Menu
                  id="dropdown-menu"
                  anchorEl={dropdownAnchorEl}
                  open={dropdownOpen}
                  onClick={handleDropdownClose}
                  onClose={handleDropdownClose}
                  MenuListProps={{
                    "aria-labelledby": "dropdown-button",
                  }}
                  sx={{ marginTop: 1 }}
                >
                  <Stack
                    direction="column"
                    padding="10px 20px"
                    alignItems="center"
                    spacing={1}
                    width={200}
                  >
                    <Stack alignItems="center" width="100%">
                      <Link
                        underline="none"
                        href="/discover"
                        sx={{ width: "100%" }}
                      >
                        <MenuItem
                          sx={{ width: "100%", justifyContent: "center" }}
                        >
                          Discover
                        </MenuItem>
                      </Link>
                      <Link
                        underline="none"
                        href="/about"
                        sx={{ width: "100%" }}
                      >
                        <MenuItem
                          sx={{ width: "100%", justifyContent: "center" }}
                        >
                          About
                        </MenuItem>
                      </Link>
                      <Link
                        underline="none"
                        href={`/users/${sessionUser.id}`}
                        sx={{ width: "100%" }}
                      >
                        <MenuItem
                          sx={{ width: "100%", justifyContent: "center" }}
                        >
                          Profile
                        </MenuItem>
                      </Link>

                      <Link
                        underline="none"
                        href="/settings"
                        sx={{ width: "100%" }}
                      >
                        <MenuItem
                          sx={{ width: "100%", justifyContent: "center" }}
                        >
                          Settings
                        </MenuItem>
                      </Link>
                      <Divider />
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ marginTop: 5, width: "100%" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Stack>
                </Menu>
              </>
            )}
            <Modal
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={createPostVisible}
              onClose={closeCreatePost}
            >
              <CreatePost
                user={sessionUser}
                setCreatePostVisible={setCreatePostVisible}
                alertCreatePostSuccess={alertCreatePostSuccess}
                closeCreatePost={closeCreatePost}
              />
            </Modal>
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;
