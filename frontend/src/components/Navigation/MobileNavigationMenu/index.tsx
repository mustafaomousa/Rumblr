import { Button, Divider, Link, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";

import * as sessionActions from "../../../store/session";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../..";

type MobileNavigationProps = {
  sessionUser: {
    id: number;
    username: string;
  };
};

const MobileNavigationMenu = ({ sessionUser }: MobileNavigationProps) => {
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
      >
        <Link underline="none" href="/discover">
          <MenuItem>Discover</MenuItem>
        </Link>
        <Link underline="none" href="/about">
          <MenuItem>About</MenuItem>
        </Link>
        <Link underline="none" href={`/users/${sessionUser.id}`}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link underline="none" href="/settings">
          <MenuItem>Settings</MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MobileNavigationMenu;
