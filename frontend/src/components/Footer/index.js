import { AppBar, Box, Container, IconButton, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    height: 55,
    width: "100%",
    backgroundColor: "#333A56",
    borderTop: "1px solid #405368",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
        padding="0 30px"
      >
        <Link href="https://github.com/mustafaomousa">
          <IconButton>
            <GitHubIcon color="secondary" />
          </IconButton>
        </Link>
        <Link href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">
          <IconButton>
            <LinkedInIcon color="secondary" />
          </IconButton>
        </Link>
        <Link href="mailto:contact@mustafamousa.com">
          <IconButton>
            <EmailIcon color="secondary" />
          </IconButton>
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
