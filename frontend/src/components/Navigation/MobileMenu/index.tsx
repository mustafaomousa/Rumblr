import React from "react";
import { Button, Link, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

import * as sessionActions from "../../../store/session";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../..";

type MobileMenuProps = {
  sessionUser: {
    id: number;
    username: string;
  };
};

const MobileMenu = ({ sessionUser }: MobileMenuProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [dropdownAnchorEl, setDropdownAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const dropdownOpen = Boolean(dropdownAnchorEl);

  const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    setDropdownAnchorEl(button);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  };

  const handleLogout = async () => {
    let logoutUser = new Promise<any>((resolve) => {
      resolve(dispatch(sessionActions.logout()));
    });

    return logoutUser.then(() => history.push("/"));
  };

  return (
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
        style={{ top: 10, left: -80 }}
        PaperProps={{ style: { minWidth: 180 } }}
      >
        <Link underline="none" href="/discover">
          <MenuItem>
            <ListItemIcon>
              <ExploreIcon fontSize="small" />
            </ListItemIcon>
            Discover
          </MenuItem>
        </Link>
        <Link underline="none" href="/about">
          <MenuItem>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            About
          </MenuItem>
        </Link>
        <Link underline="none" href={`/users/${sessionUser.id}`}>
          <MenuItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Link underline="none" href="/settings">
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenu;
