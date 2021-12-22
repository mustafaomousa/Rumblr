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
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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
      <CardContent sx={{ backgroundColor: "#333A56" }}>
        <Stack spacing={1}>
          {newestUsers &&
            newestUsers.map((newestUser) => (
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                key={newestUser.id}
                sx={{ justifyContent: "start" }}
                onClick={() => history.push(`/user/${newestUser.username}`)}
              >
                <Avatar
                  variant="square"
                  src={newestUser.profilePicture}
                  sx={{ marginRight: 2 }}
                />
                <Typography variant="subtitle2">
                  {newestUser.username}
                </Typography>
              </Button>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NewestMembers;
