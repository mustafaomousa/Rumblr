import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  TextField,
  CardContent,
  CardActions,
  IconButton,
  Input,
  CardMedia,
} from "@mui/material";
import { createNewPost } from "../../store/post";
import SendIcon from "@mui/icons-material/Send";

import S3FileUpload from "react-s3";

const CreatePost = ({ user, setCreatePostVisible }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
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
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className="CreatePost" sx={{ width: "500px", marginBottom: "20px" }}>
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
                sx={{
                  width: "100%",
                  minHeight: "200px",
                  border: "1px slategray dotted",
                }}
                component="span"
              >
                Upload
              </Button>
            )}
          </label>
          <TextField
            size="small"
            onChange={updateBody}
            value={body}
            label="Body"
            multiline
            sx={{ width: "100%", marginTop: "10px" }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton>
            <SendIcon onClick={onSubmit} />
          </IconButton>
        </CardActions>
      </form>
    </Card>
  );
};

export default CreatePost;
