import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNewestUsers } from "../../store/discover";

import "./index.css";

const NewestMembers = () => {
  const dispatch = useDispatch();

  const newestUsers = useSelector((state) => state.discover.newestUsers);

  useEffect(() => dispatch(getNewestUsers()), []);

  if (newestUsers)
    return (
      <div>
        <Card
          className="discover-page-side-newest-members"
          variant="outlined"
          sx={{ borderRadius: "0.1em" }}
        >
          <CardHeader
            align="center"
            title={<Typography>Our newest members</Typography>}
          />
          <CardContent>
            {newestUsers &&
              newestUsers.map((newestUser) => {
                return (
                  <Button key={newestUser.id} id="newest-user-button">
                    <Avatar src={newestUser.profilePicture} />
                    <Typography>{newestUser.username}</Typography>
                    <Divider />
                  </Button>
                );
              })}
          </CardContent>
        </Card>
      </div>
    );
  else return <CircularProgress />;
};

export default NewestMembers;
