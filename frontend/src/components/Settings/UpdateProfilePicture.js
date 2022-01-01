import { Avatar, Button, Input, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import S3FileUpload from "react-s3/lib/ReactS3";
import { updateProfilePicture } from "../../store/session";

const useStyles = makeStyles((theme) => ({
  userAvatar: {
    width: "100%",
  },
  userAvatarBox: {
    display: "flex",
    justifyContent: "center",
  },
}));

const UpdateProfilePicture = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const config = {
    bucketName: "rumblr-app",
    dirName: sessionUser.username.profile_picture,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_ID,
  };

  const updateProfilePic = async (e) => {
    e.preventDefault();

    await S3FileUpload.uploadFile(e.target.files[0], config).then((data) => {
      dispatch(updateProfilePicture(sessionUser.id, data.location));
    });
  };

  const deleteProfilePic = async (e) => {
    e.preventDefault();
    await dispatch(updateProfilePicture(sessionUser.id, null));
  };

  return (
    <Box>
      <Box className={classes.userAvatarBox}>
        <Avatar
          variant="square"
          className={classes.userAvatar}
          sx={{ width: "100%", height: "auto" }}
          src={sessionUser.profilePicture}
        />
      </Box>
      <Stack
        spacing={1}
        direction="row"
        marginTop={"10px"}
        justifyContent="flex-end"
        alignItems="flex-end"
        height="100%"
      >
        <Input
          type="file"
          id="profile-image"
          sx={{ display: "none" }}
          onChange={updateProfilePic}
        />
        <label htmlFor="profile-image">
          <Button
            color="secondary"
            variant="outlined"
            disableElevation
            size="small"
            component="span"
            fullWidth
          >
            Upload Image
          </Button>
        </label>
        <Button
          disableElevation
          color="warning"
          size="small"
          variant="contained"
          onClick={deleteProfilePic}
          disabled={!sessionUser.profilePicture}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdateProfilePicture;
