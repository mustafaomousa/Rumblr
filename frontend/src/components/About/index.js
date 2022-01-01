import { Stack } from "@mui/material";
import { useEffect } from "react";
import "./about-us.css";

const About = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Stack
      paddingTop={2}
      direction="row"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="space-around"
    ></Stack>
  );
};

export default About;
