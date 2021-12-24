import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getNewestUsers } from "../../store/discover";

const useStyles = makeStyles(() => ({
  root: {
    width: "500px",
  },
  newestUserButton: {
    justifyContent: "start",
  },
}));

const NewestMembers = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const newestUsers = useSelector((state) => state.discover.newestUsers);

  useEffect(() => dispatch(getNewestUsers()), []);

  return newestUsers ? (
    <Stack spacing={2} className={classes.root}>
      <Typography fontWeight="bold" color="#ffffff">
        Our newest members
      </Typography>
      <Stack spacing={1}>
        {newestUsers.map((newestUser) => (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            key={newestUser.id}
            className={classes.newestUserButton}
            onClick={() => history.push(`/user/${newestUser.id}`)}
          >
            <Avatar
              variant="square"
              src={newestUser.profilePicture}
              sx={{ marginRight: 2 }}
            />
            <Typography variant="subtitle2">{newestUser.username}</Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  ) : (
    <Stack className={classes.root} spacing={1}>
      <Skeleton animation="wave" variant="rectangular" height={30} />
      <Skeleton animation="wave" variant="rectangular" height={50} />
      <Skeleton animation="wave" variant="rectangular" height={50} />
      <Skeleton animation="wave" variant="rectangular" height={50} />
      <Skeleton animation="wave" variant="rectangular" height={50} />
    </Stack>
  );
};

export default NewestMembers;
