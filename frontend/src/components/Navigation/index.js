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
  useScrollTrigger,
  Zoom,
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
    height: 65,
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

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

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
    <AppBar className={classes.root} boxShadow={0}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Link
            href="/discover"
            fontSize="35px"
            fontWeight="bold"
            color="secondary"
            underline="none"
          >
            <Typography variant="h4" fontWeight={"bold"}>
              Rumblr
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Stack
            width="100%"
            direction="row"
            height="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={0.8}
          >
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
              // variant="outlined"
              color="secondary"
            >
              <PersonIcon />
              <Typography marginLeft={0.5} marginRight={0.5}>
                {sessionUser.username}
              </Typography>
            </Button>
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
                    href={`/user/${sessionUser.username}`}
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

                  <MenuItem
                    sx={{ width: "100%", justifyContent: "center" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </Stack>
              </Stack>
            </Menu>
            <Button
              size="small"
              variant="outlined"
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
