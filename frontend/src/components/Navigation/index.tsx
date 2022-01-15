import { AppBar, Grid, Link, IconButton, Stack } from "@mui/material";
import { isMobile } from "react-device-detect";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";

import CreatePostModal from "../CreatePostModal";
import { useAppSelector } from "../..";
import SessionUserMenu from "./SessionUserMenu";
import useStyles from "./useStyles";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const Navigation = () => {
  const classes = useStyles();

  const sessionUser = useAppSelector((state) => state.session.user);

  return (
    <AppBar className={classes.root} elevation={0}>
      <Grid container alignItems="center" maxWidth={1680}>
        <Grid item xs={1}>
          <Logo />
        </Grid>
        <Grid item xs={11}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            {isMobile ? (
              <MobileMenu sessionUser={sessionUser} />
            ) : (
              <>
                <Link href="/discover">
                  <IconButton color="secondary">
                    <HomeIcon />
                  </IconButton>
                </Link>
                <Link href="/about">
                  <IconButton color="secondary">
                    <HelpIcon />
                  </IconButton>
                </Link>
                <SessionUserMenu sessionUser={sessionUser} />
              </>
            )}
            <CreatePostModal sessionUser={sessionUser} />
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;
