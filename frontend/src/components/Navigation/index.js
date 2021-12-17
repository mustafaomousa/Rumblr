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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonRounded";
import HelpIcon from "@mui/icons-material/Help";
import * as sessionActions from "../../store/session";
import HomeIcon from "@mui/icons-material/Home";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "0 30px",
    height: 60,
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
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Link
            href="/discover"
            fontSize="35px"
            fontWeight="bold"
            color="secondary"
            underline="none"
          >
            R
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Stack
            width="100%"
            direction="row"
            height="100%"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <IconButton href="/discover" color="secondary">
              <HomeIcon />
            </IconButton>
            <IconButton href="/about" color="secondary">
              <HelpIcon />
            </IconButton>
            <Button
              className={classes.userIcon}
              variant="outlined"
              color="secondary"
            >
              <PersonIcon />
              <Typography marginLeft={0.5}>{sessionUser.username}</Typography>
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Log out
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;
