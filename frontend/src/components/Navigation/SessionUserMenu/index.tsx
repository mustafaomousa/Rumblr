import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Link, ListItemIcon, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import * as sessionActions from "../../../store/session";
import useStyles from "../useStyles";
import { useAppDispatch } from "../../..";

type SessionUserMenuProps = {
  sessionUser: {
    id: number;
    username: string;
  };
};

const SessionUserMenu = ({ sessionUser }: SessionUserMenuProps) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    return setAnchorEl(button);
  };

  const handleClose = () => {
    return setAnchorEl(null);
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
        id="user-button"
        aria-controls="user-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.userIcon}
        color="secondary"
        variant="outlined"
        endIcon={<PersonIcon />}
      >
        {sessionUser.username}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        style={{ top: 10, left: -60 }}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
        PaperProps={{ style: { minWidth: 180 } }}
      >
        <Link href={`/users/${sessionUser.id}`} underline="none">
          <MenuItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Link href="/settings" underline="none">
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

export default SessionUserMenu;
