import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "./profile.css";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { Box } from "@mui/system";
import { getUserProfile } from "../../store/user";

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
                <Tab label="POSTS" value={0} sx={{ color: "white" }}>
                  <p>heyy</p>
                </Tab>
                <Tab label="PINNED" value={1} sx={{ color: "white" }} />
              </TabList>
            </Box>
            <TabPanel value={0}>
              <Stack spacing={5}>
                {posts &&
                  posts.map((post) => (
                    <Card>
                      <CardMedia
                        image={post.content}
                        component="img"
                        height="200px"
                      />
                      <CardContent>
                        <Typography>{post.body}</Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton>
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                          <SmartButtonIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
              </Stack>
            </TabPanel>
            <TabPanel value={1}>hi again</TabPanel>
          </TabContext>
        </div>
      </Container>
    </Drawer>
  );
};

export default ProfileDrawer;
