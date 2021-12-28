import { Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";
import "./about-us.css";

const AboutUs = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="about-us-page"
    >
      <Box className="divider-container">
        <Box className="about-us-container">
          <Typography color="secondary" fontSize="35px" align="center">
            Rumblr is a clone based on the well known app/website named Tumblr.
          </Typography>
        </Box>
      </Box>
      <Box className="divider-container-2">
        <Box flexDirection={"column"} className="about-us-container-2">
          <Typography color="secondary" fontSize="35px" align="center">
            Rumblr's front-end was created using React and Redux.
          </Typography>
          {/* <Stack direction="row" justifyContent="space-around">
            <Typography>React logo</Typography>
            <Typography>Redux logo</Typography>
          </Stack> */}
        </Box>
      </Box>
      <Box className="divider-container-3">
        <Box className="about-us-container-3">
          <Typography color="secondary" fontSize="35px" align="center">
            Rumblr's back-end was created using Express and PSQL.
          </Typography>
        </Box>
      </Box>
      <Box className="divider-container-2" sx={{ width: "100%" }}>
        <Stack
          paddingTop={2}
          direction="row"
          width="100%"
          justifyContent="space-around"
        >
          <Link href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">
            <LinkedInIcon sx={{ width: 100, height: 100, color: "#ffffff" }} />
          </Link>
          <Link href="https://github.com/mustafaomousa">
            <GitHubIcon sx={{ width: 100, height: 100, color: "#ffffff" }} />
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AboutUs;
