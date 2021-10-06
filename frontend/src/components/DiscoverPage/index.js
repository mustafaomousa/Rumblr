import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import "./index.css";
import CreatePost from "../CreatePost";

const FeedPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <Stack className="DiscoverPage" spacing={5}>
      <CreatePost user={sessionUser} />
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
      <Card sx={{ width: "500px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="username here"
        />
        <CardMedia
          component="img"
          // height="00px"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rs-e-tron-gt-tango-red-10-1628022210.jpg?crop=0.845xw:0.842xh;0.0459xw,0.0356xh&resize=640:*"
          alt="image"
        />
        <CardContent>
          <Typography>post body here</Typography>
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
    </Stack>
  );
};

export default FeedPage;
