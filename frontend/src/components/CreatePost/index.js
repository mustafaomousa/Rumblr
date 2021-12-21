import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Input,
  CardMedia,
  Typography,
} from "@mui/material";
import { createNewPost } from "../../store/post";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import S3FileUpload from "react-s3";
import useGlobalStyles from "../useGlobalStyles";

const CreatePost = ({ user, setCreatePostVisible, alertCreatePostSuccess }) => {
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
    <Card
      className="CreatePost"
      sx={{ width: "500px", marginBottom: "20px", backgroundColor: "#52658F" }}
    >
      <form>
        <CardContent>
          {selectedImage && (
            <CardMedia
              component="img"
              image={URL.createObjectURL(selectedImage)}
            />
          )}
          <label>
            <Input
              accept="image/*"
              onChange={updateSelectedImage}
              style={{ display: "none" }}
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
          <Input
            disableUnderline
            className={globalStyles.input}
            multiline
            onChange={updateBody}
            value={body}
            label="Body"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: 1,
            }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" onClick={onSubmit}>
            <SendIcon sx={{ marginRight: 1 }} />
            <Typography>Post</Typography>
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default CreatePost;
