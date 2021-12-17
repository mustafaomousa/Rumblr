import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
          <Typography color="primary" fontSize="35px" align="center">
            Rumblr is a clone based on the well known app/website named Tumblr.
          </Typography>
        </Box>
      </Box>
      <Box className="divider-container-2">
        <Box className="about-us-container-2">
          <Typography color="primary" fontSize="35px" align="center">
            Rumblr's front-end was created using React and Redux.
          </Typography>
        </Box>
      </Box>
      <Box className="divider-container-3">
        <Box className="about-us-container-3">
          <Typography color="primary" fontSize="35px" align="center">
            Rumblr's back-end was created using Express and PSQL.
          </Typography>
        </Box>
      </Box>
      <Box className="divider-container-2">
        <Box className="about-us-container-4">
          <Typography color="primary" fontSize="35px" align="center">
            Rumblr was created by Mustafa Mousa.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default AboutUs;
