import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  createPostModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  createPostForm: {
    maxWidth: 500,
    width: "100%",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  imageInput: {
    display: "none",
  },
  imageButton: {
    height: "200px",
  },
}));
