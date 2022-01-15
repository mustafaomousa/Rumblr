import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

export default makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isMobile ? "0 10px" : "0 30px",
    height: 55,
    borderBottom: "1px solid #405368",
  },
  searchInput: {
    width: 200,
  },
  userIcon: {
    minWidth: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
}));
