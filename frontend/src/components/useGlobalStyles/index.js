import { makeStyles } from "@mui/styles";

const useGlobalStyles = () => {
  const useStyles = makeStyles(() => ({}));

  const globalStyles = useStyles();

  return globalStyles;
};

export default useGlobalStyles;
