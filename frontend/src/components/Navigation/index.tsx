import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import HelpIcon from "@mui/icons-material/Help";
import * as sessionActions from "../../store/session";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Box } from "@mui/system";
import CreatePost from "../CreatePost";
import { useAppSelector } from "../..";
import SessionUserMenu from "./SessionUserMenu";
import useStyles from "./useStyles";

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);

  const dropdownOpen = Boolean(dropdownAnchorEl);

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    // setDropdownAnchorEl(event.currentTarget);
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

  const sessionUser = useAppSelector((state) => state.session.user);

  return (
    <AppBar className={classes.root} elevation={0}>
      <Grid container alignItems="center" maxWidth={1680}>
        <Grid item xs={1}>
          <Link href="/discover" color="secondary" underline="none">
            <Typography fontWeight="bold" fontSize="25px">
              Rumblr
            </Typography>
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
                <SessionUserMenu sessionUser={sessionUser} />
              </>
            )}
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 0 }}
              onClick={() => setCreatePostVisible(true)}
            >
              <AddCircleOutlineIcon />
              <Box>
                {/* <Notification
                  open={successNotificationOpen}
                  handleClose={closeAlertCreatePostSuccess}
                  message={"Post created"}
                /> */}
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
