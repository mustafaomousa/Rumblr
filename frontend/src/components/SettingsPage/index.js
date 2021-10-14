import {
  Avatar,
  Button,
  Container,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import "./index.css";

const SettingsPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="settings-page">
      <Container sx={{ width: "600px", padding: "20px" }}>
        <form style={{ display: "flex" }}>
          <Stack spacing={4}>
            <Box>
              <InputLabel sx={{ color: "whitesmoke", fontSize: "20px" }}>
                Username
              </InputLabel>
              <Input
                sx={{ color: "lightblue", borderBottom: "1px solid white" }}
                value={sessionUser.username}
              />
            </Box>
            <Box>
              <InputLabel sx={{ color: "whitesmoke", fontSize: "20px" }}>
                Email
              </InputLabel>
              <Input
                sx={{ color: "lightblue", borderBottom: "1px solid white" }}
                value={sessionUser.email}
              />
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: "10px" }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: "10px" }}
              >
                Change Password
              </Button>
              <Button variant="outlined" size="small" fullWidth>
                Delete Account
              </Button>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ width: "180px", height: "180px" }} />
            <div
              style={{
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Button>Upload</Button>
              <Button sx={{ color: "red" }}>Delete</Button>
            </div>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default SettingsPage;
