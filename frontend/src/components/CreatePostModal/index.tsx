import React from "react";
import {
  Button,
  Input,
  CardMedia,
  Typography,
  TextField,
  Stack,
  Modal,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";

import { useAppDispatch } from "../..";
import useS3 from "./useS3";
import { createNewPost } from "../../store/post";
import useStyles from "./useStyles";

type CreatePostProps = {
  sessionUser: {
    id: number;
    username: string;
  };
};

const CreatePost = ({ sessionUser }: CreatePostProps) => {
  const s3 = useS3();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [body, setBody] = React.useState<String>("");
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [createPostVisible, setCreatePostVisible] = React.useState(false);

  const openCreatePost = () => setCreatePostVisible(true);
  const closeCreatePost = () => setCreatePostVisible(false);

  const updateSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = event.currentTarget;
    input.files && setSelectedImage(input.files[0]);
  };

  const updateBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = event.currentTarget;
    setBody(input.value);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tags = body.match(/#[A-Za-z0-9]*/g);

    await s3
      .uploadFile(selectedImage)
      .then((data) => {
        dispatch(
          createNewPost({
            content: data.location,
            body,
            tags,
            userId: sessionUser.id,
          })
        ).then(() => {
          setSelectedImage(null);
          setBody("");
          setCreatePostVisible(false);
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={openCreatePost}
        endIcon={<AddCircleOutlineIcon />}
      >
        Post
      </Button>
      <Modal
        className={classes.createPostModal}
        open={createPostVisible}
        onClose={closeCreatePost}
      >
        <form className={classes.createPostForm} onSubmit={onSubmit}>
          <Stack spacing={2}>
            {selectedImage && (
              <CardMedia
                component="img"
                image={URL.createObjectURL(selectedImage)}
              />
            )}
            <label>
              <Input
                className={classes.imageInput}
                onChange={updateSelectedImage}
                type="file"
                name="image"
              />
              {!selectedImage && (
                <Button
                  className={classes.imageButton}
                  fullWidth
                  component="span"
                >
                  <ImageIcon color="primary" />
                </Button>
              )}
            </label>
            <TextField
              color="secondary"
              multiline
              onChange={updateBody}
              value={body}
              label="Body"
              name="body"
              fullWidth
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
                {selectedImage ? "Clear" : "Cancel"}
              </Button>
              <Button
                id="submitCreatePost"
                size="small"
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
              >
                Post
              </Button>
            </Stack>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
