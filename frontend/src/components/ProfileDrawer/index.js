import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./profile.css";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  ImageList,
  ImageListItem,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getUserProfile } from "../../store/user";
import Notification from "../Notification";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
const ProfileDrawer = ({ userId, profileDrawerOpen, closeProfileDrawer }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile_user.user);
  const posts = useSelector((state) => state.user.profile_user.posts);
  const [tab, setTab] = useState(0);

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    profileDrawerOpen && dispatch(getUserProfile(userId));
  }, [profileDrawerOpen]);

  return (
    <Drawer
      anchor="right"
      open={profileDrawerOpen}
      onClose={closeProfileDrawer}
    >
      <Container
        className="ProfileDrawer"
        sx={{
          width: "500px",
          margin: "0px -24px",
          backgroundColor: "#3c1f41",
          minHeight: "100%",
          overflow: "scroll",
        }}
      >
        <div className="ProfileDrawerHeader">
          <Avatar
            sx={{
              width: "130px",
              height: "130px",
              display: "relative",
              bottom: "-40px",
            }}
            src={user && user.profilePicture}
          />
        </div>
        <div className="ProfileDrawerBody">
          <div className="ProfileUserInfo">
            <Typography variant="h4" color="white">
              {user && user.username}
            </Typography>
            <Typography variant="p" color="white">
              {user && user.bio}
            </Typography>
          </div>
          <TabContext value={tab}>
            <Box>
              <TabList onChange={handleChange}>
                <Tab label="POSTS" value={0} sx={{ color: "white" }} />
                <Tab label="PINNED" value={1} sx={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value={0}>
              <ImageList variant="quilted" cols={2}>
                {posts &&
                  posts.map((post) => (
                    <ImageListItem key={post.id}>
                      <img {...srcset(post.content, 121)} loading="lazy" />
                    </ImageListItem>
                    // <Card sx={{ padding: "0.1em" }}>
                    //   <CardMedia
                    //     image={post.content}
                    //     component="img"
                    //     height="200px"
                    //   />
                    //   <CardContent>
                    //     <Typography>{post.body}</Typography>
                    //   </CardContent>
                    // </Card>
                  ))}
              </ImageList>
              <Stack spacing={5}></Stack>
            </TabPanel>
            <TabPanel value={1}>hi again</TabPanel>
          </TabContext>
        </div>
      </Container>
    </Drawer>
  );
};

export default ProfileDrawer;
