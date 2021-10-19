import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, Redirect } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Drawer,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/PersonRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import * as sessionActions from "../../store/session";

import "./index.css";
import { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";

const styles = {
  toolbar: {
    backgroundColor: "#301934",
  },
};

const Navigation = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const userOpen = Boolean(anchorEl);

  const openUser = (e) => setAnchorEl(e.currentTarget);
  const closeUser = () => setAnchorEl(null);

  const openProfileDrawer = () => {
    setProfileDrawerOpen(true);
    closeUser();
  };
  const closeProfileDrawer = () => setProfileDrawerOpen(false);

  const handleLogout = async () => {
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: "1px solid #3c1f41",
        boxShadow: "none",
        border: "none",
      }}
    >
      {sessionUser && (
        <ProfileDrawer
          userId={sessionUser.id}
          profileDrawerOpen={profileDrawerOpen}
          closeProfileDrawer={closeProfileDrawer}
        />
      )}
      <Toolbar className={classes.toolbar}>
        <Grid container>
          <Grid item xs={6} className="NavigationLogoContainer">
            <Link
              style={{
                textDecoration: "none",
                marginLeft: "40px",
                position: "fixed",
                marginTop: "60px",
                zIndex: "10000",
              }}
              to="/discover"
            >
              <Typography variant="h4" fontWeight="bolder" color="white">
                Rumblr
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} className="NavigationIconContainer">
            {sessionUser && (
              <div>
                <Button onClick={openUser}>
                  <Avatar src={sessionUser.profilePicture} />
                  <Typography sx={{ pl: "10px", color: "white" }}>
                    {sessionUser.username}
                  </Typography>
                </Button>
                <Menu anchorEl={anchorEl} open={userOpen} onClose={closeUser}>
                  <Stack sx={{ width: "200px" }}>
                    <MenuItem
                      sx={{ width: "100%" }}
                      onClick={openProfileDrawer}
                    >
                      <PersonIcon sx={{ pr: "10px" }} />
                      Profile
                    </MenuItem>
                    <MenuItem sx={{ width: "100%" }} onClick={handleLogout}>
                      <LogoutIcon sx={{ pr: "10px" }} />
                      Log out
                    </MenuItem>
                  </Stack>
                </Menu>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      {sessionUser && (
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            border: "none",
            "& .MuiDrawer-paper": {
              marginTop: "64px",
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#301934",
              border: "none",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Stack spacing={1} marginTop="100px">
            <NavLink
              to="/discover"
              activeStyle={{ opacity: "1" }}
              style={{
                textDecorationLine: "none",
                opacity: "0.2",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0px 60px",
                }}
              >
                <ExploreIcon sx={{ fontSize: "25px" }} />{" "}
                <Typography sx={{ pl: "10px" }}>Discover</Typography>
              </Button>
            </NavLink>
            <NavLink
              to="/about"
              activeStyle={{ opacity: "1" }}
              style={{
                textDecorationLine: "none",
                marginRight: "25px",
                opacity: "0.2",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0px 60px",
                }}
              >
                <HelpIcon sx={{ fontSize: "25px" }} />
                <Typography sx={{ pl: "10px" }}>About</Typography>
              </Button>
            </NavLink>
            <NavLink
              to="/settings"
              activeStyle={{ opacity: "1" }}
              style={{
                textDecorationLine: "none",
                marginRight: "25px",
                opacity: "0.2",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0px 60px",
                }}
              >
                <SettingsIcon sx={{ fontSize: "25px" }} />
                <Typography sx={{ pl: "10px" }}>Settings</Typography>
              </Button>
            </NavLink>
          </Stack>
        </Drawer>
      )}
    </AppBar>
  );
};

export default withStyles(styles)(Navigation);
