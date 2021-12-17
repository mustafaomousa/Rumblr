import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Button, Stack, AppBar, Grid, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonRounded";
import * as sessionActions from "../../store/session";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "0 30px",
    height: 75,
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

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = async () => {
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <AppBar className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <Typography fontSize="30px">Rumblr</Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" alignItems="center" height="100%" spacing={5}>
            <Link underline="none" href="/discover" color="#ffffff">
              Discover
            </Link>
            <Link underline="none" href="/about" color="#ffffff">
              Search
            </Link>
            <Link underline="none" href="/about" color="#ffffff">
              About
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            width="100%"
            direction="row"
            height="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              className={classes.userIcon}
              variant="outlined"
              color="secondary"
            >
              <PersonIcon />
              <Typography marginLeft={0.5}>{sessionUser.username}</Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;
