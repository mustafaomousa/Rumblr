import { Typography } from "@mui/material";
import { useEffect } from "react";
import "./about-us.css";

const AboutUsPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="about-us-page">
      <div className="divider-container">
        <div className="about-us-container">
          <Typography color="whitesmoke" fontSize="35px" align="center">
            Rumblr is a clone based on the well known app/website named Tumblr.
          </Typography>
        </div>
      </div>
      <div className="divider-container-2">
        <div className="about-us-container-2">
          <Typography color="whitesmoke" fontSize="35px" align="center">
            Rumblr's front-end was created using React and Redux.
          </Typography>
        </div>
      </div>
      <div className="divider-container-3">
        <div className="about-us-container-3">
          <Typography color="whitesmoke" fontSize="35px" align="center">
            Rumblr's back-end was created using Express and PSQL.
          </Typography>
        </div>
      </div>
      <div className="divider-container-2">
        <div className="about-us-container-4">
          <Typography color="whitesmoke" fontSize="35px" align="center">
            Rumblr was created by Mustafa Mousa.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
