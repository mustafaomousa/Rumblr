import { Avatar, Button, Input, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import S3FileUpload from "react-s3/lib/ReactS3";
import { updateProfilePicture } from "../../store/session";

const UpdateProfilePicture = ({ sessionUser, updateSessionUser }) => {
  const dispatch = useDispatch();

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
    //   .then(() => restoreUser());
  };
  return (
    <form>
      <Typography color="primary" variant="h6" gutterBottom={2}>
        Profile picture
      </Typography>
      <Avatar
        variant="square"
        sx={{
          width: "auto",
          height: 285,
        }}
        src={sessionUser.profilePicture}
      />
      <Stack
        spacing={1}
        direction="column"
        padding="10px 0px"
        justifyContent="flex-end"
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
            disableElevation
            size="small"
            variant="contained"
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
          onClick={() => dispatch(updateProfilePicture(sessionUser.id, null))}
        >
          Delete
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateProfilePicture;
