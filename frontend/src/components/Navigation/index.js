import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import * as sessionActions from "../../store/session";

import "./index.css";

const styles = {
  toolbar: {
    backgroundColor: "#301934",
  },
};

const Navigation = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: "1px solid #3c1f41",
        boxShadow: "none",
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Grid container>
          <Grid item xs={6} className="NavigationLogoContainer">
            <Typography variant="h5" fontWeight="bolder" color="white">
              Rumblr
            </Typography>
          </Grid>
          <Grid item xs={6} className="NavigationIconContainer">
            {sessionUser && (
              <>
                <NavLink
                  to="/discover"
                  activeStyle={{ borderBottom: "1px solid white" }}
                  style={{ textDecorationLine: "none" }}
                >
                  <Button sx={{ color: "white" }}>
                    <ExploreIcon sx={{ fontSize: "25px" }} />{" "}
                    <Typography sx={{ pl: "10px" }}>Discover</Typography>
                  </Button>
                </NavLink>
                <NavLink
                  to="/about"
                  activeStyle={{ borderBottom: "1px solid white" }}
                  style={{ textDecorationLine: "none" }}
                >
                  <Button sx={{ color: "white" }}>
                    <HelpIcon sx={{ fontSize: "25px" }} />
                    <Typography sx={{ pl: "10px" }}>About</Typography>
                  </Button>
                </NavLink>
                <NavLink
                  to="/settings"
                  activeStyle={{ borderBottom: "1px solid white" }}
                  style={{ textDecorationLine: "none" }}
                >
                  <Button sx={{ color: "white" }}>
                    <SettingsIcon sx={{ fontSize: "25px" }} />
                    <Typography sx={{ pl: "10px" }}>Settings</Typography>
                  </Button>
                </NavLink>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navigation);
