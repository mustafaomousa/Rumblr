import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebAssetIcon from "@mui/icons-material/WebAsset";

const useStyles = makeStyles(() => ({
  root: {
    padding: "100px 0",
    marginBottom: 55,
  },
  footerContainer: {
    marginInline: "auto",
    width: "min(90%, 1200px)",
  },
  link: {
    "&:hover": {
      borderBottom: "1px solid #fff",
    },
  },
}));

const LargeFooter = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.footerContainer}>
        <Grid container spacing={5}>
          <Grid item sm={6} md={3}>
            <Stack alignItems={"flex-start"}>
              <Typography color="secondary" variant="h6" marginBottom={2}>
                Client Technologies
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                React.js
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                Redux.js
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                Material UI
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                Lodash
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={6} md={3}>
            <Stack alignItems={"flex-start"}>
              <Typography color="secondary" variant="h6" marginBottom={2}>
                Server Technologies
              </Typography>

              <Typography color="#fff" variant="body2" gutterBottom={true}>
                Express.js
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                Sequelize
              </Typography>
              <Typography color="#fff" variant="body2" gutterBottom={true}>
                PostgreSQL
              </Typography>
            </Stack>
          </Grid>
          <Grid item sm={6} md={3}>
            <Stack alignItems={"flex-start"}>
              <Typography color="secondary" variant="h6" marginBottom={2}>
                Links
              </Typography>
              <Link href="https://github.com/mustafaomousa">
                <Typography
                  color="#fff"
                  variant="body2"
                  gutterBottom={true}
                  className={classes.link}
                >
                  <GitHubIcon fontSize="extrasmall" /> GitHub
                </Typography>
              </Link>
              <Link href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">
                <Typography
                  color="#fff"
                  variant="body2"
                  gutterBottom={true}
                  className={classes.link}
                >
                  <LinkedInIcon fontSize="extrasmall" /> LinkedIn
                </Typography>
              </Link>
              <Link href="https://mustafamousa.com/">
                <Typography
                  color="#fff"
                  variant="body2"
                  gutterBottom={true}
                  className={classes.link}
                >
                  <WebAssetIcon fontSize="extrasmall" /> Portfolio
                </Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LargeFooter;
