import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
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
import { useState } from "react";

import * as sessionActions from "../../store/session";
import ProfileDrawer from "../ProfileDrawer";

import "./index.css";

const styles = {
  toolbar: {
    backgroundColor: "#301934",
  },
};

const Navigation = () => {
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
    <div>
      {sessionUser && (
        <ProfileDrawer
          userId={sessionUser.id}
          profileDrawerOpen={profileDrawerOpen}
          closeProfileDrawer={closeProfileDrawer}
        />
      )}
      {sessionUser && (
        <Drawer
          sx={{
            width: "15vw",
            flexShrink: 0,
            border: "none",
            "& .MuiDrawer-paper": {
              width: "15vw",
              boxSizing: "border-box",
              backgroundColor: "#301934",
              border: "none",
              padding: "25px 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              borderRight: "#39203d 0.5px solid",
            },
          }}
          variant="permanent"
        >
          <Stack spacing={0}>
            <Typography
              textAlign="center"
              color="white"
              fontWeight="bolder"
              variant="h4"
              paddingBottom="40px"
            >
              Rumblr
            </Typography>
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
                  justifyContent: "space-between",
                }}
              >
                <ExploreIcon />
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
                  justifyContent: "space-between",
                }}
              >
                <HelpIcon />
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
                  justifyContent: "space-between",
                }}
              >
                <SettingsIcon />
                <Typography sx={{ pl: "10px" }}>Account</Typography>
              </Button>
            </NavLink>
          </Stack>
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
                  <MenuItem sx={{ width: "100%" }} onClick={openProfileDrawer}>
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
        </Drawer>
      )}
    </div>
  );
};

export default withStyles(styles)(Navigation);
