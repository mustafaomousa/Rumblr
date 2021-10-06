import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  TextField,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Image,
  IconButton,
  Input,
} from "@mui/material";
import { createNewPost } from "../../store/post";
import SendIcon from "@mui/icons-material/Send";
import UploadPictureS3Client from "../../aws/s3";

const CreatePost = ({ user }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [body, setBody] = useState("");

  const updateBody = (e) => setBody(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    const tags = body.match(/#[A-Za-z0-9]*/g);
    const payload = {
      content:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*",
      body,
      tags,
      userId: user.id,
    };

    dispatch(createNewPost(payload))
      .then(() => {
        setContent("");
        setBody("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card className="CreatePost" sx={{ width: "500px" }}>
      <CardHeader avatar={<Avatar />} />
      <form>
        <CardContent>
          <label>
            <Input accept="image/*" style={{ display: "none" }} type="file" />
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
