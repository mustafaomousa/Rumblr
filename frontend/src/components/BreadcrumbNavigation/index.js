import { Breadcrumbs, Container, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    let pathArray = location.pathname.split("/");
    pathArray.shift();
    setPath(pathArray);
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "55px",
        width: "100%",
      }}
    >
      <Container>
        <Breadcrumbs
          sx={{ maxWidth: "1200px", padding: "20px 20px" }}
          separator={<ChevronRightIcon color="secondary" />}
        >
          <Link
            underline={path == "discover" ? "always" : "hover"}
            color="secondary"
            href="/discover"
          >
            Discover
          </Link>
          {path &&
            path.map(
              (pathname) =>
                pathname &&
                pathname !== "discover" && (
                  <Link
                    underline="always"
                    color="secondary"
                    href={`/${pathname}`}
                  >
                    {pathname[0].toUpperCase() + pathname.slice(1)}
                  </Link>
                )
            )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default BreadcrumbNavigation;
