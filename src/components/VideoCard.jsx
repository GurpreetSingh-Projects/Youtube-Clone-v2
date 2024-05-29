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
export default function VideoCard(video) {
  console.log(video);
  return (
    <Card>
      {/* <Link to={video.videoId ? `/video/${video.videoId}` : demoVideoUrl}>
        <CardMedia
          image={video.snippet?.thumbnails?.low?.url}
          alt={snippet?.title}
          sx={{ width: 350, height: 200 }}
        ></CardMedia>
      </Link> */}
    </Card>
  );
}
