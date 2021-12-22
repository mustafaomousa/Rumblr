import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  CardActions,
  Input,
  CardMedia,
  Typography,
  TextField,
  Stack,
  Container,
} from "@mui/material";
import { createNewPost } from "../../store/post";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import S3FileUpload from "react-s3";
import useGlobalStyles from "../useGlobalStyles";
import { Box } from "@mui/system";

const CreatePost = ({
  user,
  setCreatePostVisible,
  alertCreatePostSuccess,
  closeCreatePost,
}) => {
  const dispatch = useDispatch();
  const globalStyles = useGlobalStyles();
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const updateSelectedImage = (e) => setSelectedImage(e.target.files[0]);
  const updateBody = (e) => setBody(e.target.value);

  const config = {
    bucketName: "rumblr-app",
    dirName: user.username,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_ID,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tags = body.match(/#[A-Za-z0-9]*/g);

    S3FileUpload.uploadFile(selectedImage, config)
      .then((data) => {
        dispatch(
          createNewPost({ content: data.location, body, tags, userId: user.id })
        ).then(() => {
          setSelectedImage(null);
          setBody("");
          setCreatePostVisible(false);
          alertCreatePostSuccess();
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <form>
      <Stack
        padding={5}
        spacing={3}
        sx={{
          width: "500px",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          borderRadius: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>
          {selectedImage && (
            <CardMedia
              sx={{ backgroundColor: "#ffffff", width: "100%" }}
              component="img"
              image={URL.createObjectURL(selectedImage)}
            />
          )}
          <label style={{ width: "100%" }}>
            <Input
              accept="image/*"
              onChange={updateSelectedImage}
              style={{ display: "none", width: "100%" }}
              type="file"
            />
            {!selectedImage && (
              <Button
                color="secondary"
                variant="contained"
                sx={{
                  width: "100%",
                  height: "200px",
                }}
                component="span"
              >
                <ImageIcon color="primary" />
              </Button>
            )}
          </label>
        </Box>
        <TextField
          color="secondary"
          multiline
          onChange={updateBody}
          value={body}
          label="Body"
          sx={{
            width: "100%",
          }}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={
              selectedImage ? () => setSelectedImage(null) : closeCreatePost
            }
          >
            <Typography>
              {selectedImage ? "Clear selection" : "Cancel"}
            </Typography>
          </Button>
          <Button
            size="small"
            type="submit"
            variant="contained"
            onClick={onSubmit}
          >
            <SendIcon sx={{ marginRight: 1 }} />
            <Typography>Post</Typography>
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreatePost;
