import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
const VideoCard = (props) => {
  console.log(video);
  return (
    <>
      <Card>
        {/* <Link to={props.videoId ? `/video/${props.videoId}` : demoVideoUrl}> */}
          <CardMedia
            image={props.snippet?.thumbnails?.low?.url}
            alt={snippet?.title}
            sx={{ width: 350, height: 200 }}
          ></CardMedia>
        </Link>
      </Card>
    </>
  );
};

export default VideoCard;
