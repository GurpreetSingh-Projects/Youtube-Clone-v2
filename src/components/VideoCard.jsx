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
export default function VideoCard({ video, channelDetail }) {
  const description = video.snippet.title.slice(0, 60);
  return (
    <Card
      sx={{
        width: { md: "320px", xs: "100%" },
        boxShadow: "none",
        borderRadius: "10px",
      }}
    >
      <Link to={`/video/${video?.id?.videoId}`}>
        <CardMedia
          component="img"
          loading="lazy"
          image={video?.snippet?.thumbnails?.medium?.url}
          alt={video?.snippet?.title}
          sx={{ width: 350, height: 200 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
        <Link to={`/video/${video?.id?.videoId}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="grey">
            {/* {video?.snippet?.title?.slice(0, 50) || demoVideoTitle.slice(0, 50)} */}
            <div
              dangerouslySetInnerHTML={{ __html: description.slice(0, 90) }}
            ></div>
          </Typography>
        </Link>

        <Link
          to={
            video?.snippet?.channelId
              ? `/channel/${video?.snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography
            variant="subtitle2"
            color="white"
            fontWeight="semibold"
            m="5px"
          >
            {video?.snippet?.channelTitle || demoChannelUrl}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}
