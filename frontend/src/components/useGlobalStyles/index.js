import { makeStyles } from "@mui/styles";

const useGlobalStyles = () => {
  const useStyles = makeStyles(() => ({
    input: {
      backgroundColor: "#ffffff",
      borderRadius: "0.3em",
      padding: "3px 10px",
      boxShadow:
        "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    },
  }));

  const globalStyles = useStyles();

  return globalStyles;
};

export default useGlobalStyles;
