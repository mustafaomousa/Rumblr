import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNewestUsers } from "../../store/discover";

const useStyles = makeStyles(() => ({
  root: {
    width: "500px",
  },
  cardHeader: {
    backgroundColor: "#333A56",
  },
}));

const NewestMembers = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const newestUsers = useSelector((state) => state.discover.newestUsers);

  useEffect(() => dispatch(getNewestUsers()), []);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={
          <Typography fontWeight="bold" color="#ffffff">
            Our newest members
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          {newestUsers &&
            newestUsers.map((newestUser) => (
              <Button
                variant="outlined"
                key={newestUser.id}
                sx={{ justifyContent: "start" }}
              >
                <Avatar
                  src={newestUser.profilePicture}
                  sx={{ marginRight: 2 }}
                />
                <Typography>{newestUser.username}</Typography>
                <Divider />
              </Button>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NewestMembers;
