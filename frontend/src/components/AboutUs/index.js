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
      paddingTop={2}
      direction="row"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="space-around"
    >
      <Link href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">
        <LinkedInIcon sx={{ width: 100, height: 100, color: "#ffffff" }} />
      </Link>
      <Link href="https://github.com/mustafaomousa">
        <GitHubIcon sx={{ width: 100, height: 100, color: "#ffffff" }} />
      </Link>
    </Stack>
  );
};

export default AboutUs;
