import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";

import * as sessionActions from "../../store/session";

import "./index.css";

const styles = {
  toolbar: {
    backgroundColor: "purple",
  },
};

const Navigation = ({ classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logout());
    return history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={3}>
          <Grid item xs={1} className="NavigationLogoContainer">
            <Typography variant="h5" fontWeight="bolder" color="white">
              Rumblr
            </Typography>
          </Grid>
          <Grid item xs={4} className="NavigationSearchContainer">
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="secondary"
            />
            <Button startIcon={<SearchIcon />} sx={{ color: "white" }} />
          </Grid>
          <Grid item xs={5} className="NavigationLoginContainer">
            {!sessionUser && (
              <>
                <TextField
                  size="small"
                  sx={{ paddingRight: "10px" }}
                  label="username/email"
                  variant="outlined"
                  color="secondary"
                />
                <TextField
                  size="small"
                  sx={{ paddingRight: "10px" }}
                  label="password"
                  variant="outlined"
                  color="secondary"
                />
                <Button sx={{ color: "white" }}>Log in</Button>
              </>
            )}
          </Grid>
          <Grid item xs={2} className="NavigationIconContainer">
            <NavLink to="/discover">
              <Button sx={{ color: "white" }}>
                <ExploreIcon sx={{ fontSize: "40px" }} />
              </Button>
            </NavLink>
            {sessionUser && (
              <>
                <NavLink to={`/${sessionUser.username}`}>
                  <Button sx={{ color: "white" }}>
                    <AccountBoxIcon sx={{ fontSize: "40px" }} />
                  </Button>
                </NavLink>
                <Button sx={{ color: "white" }} onClick={handleLogout}>
                  <LogoutIcon sx={{ fontSize: "40px" }} />
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navigation);
