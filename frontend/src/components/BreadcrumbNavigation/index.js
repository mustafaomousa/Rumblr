import { Breadcrumbs, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname.split("/")[1]);
  }, [location]);

  console.log(path);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "55px",
        width: "100%",
        padding: "20px 30px",
      }}
    >
      <Breadcrumbs sx={{ width: "1200px" }}>
        <Link underline="hover" color="secondary" href="/discover">
          Discover
        </Link>
        {path && path !== "discover" && (
          <Link underline="hover" color="secondary" href={location.pathname}>
            {path[0].toUpperCase() + path.substring(1)}
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNavigation;
