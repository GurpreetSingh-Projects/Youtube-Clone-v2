import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { useState, useEffect } from "react";
import { fetchApi } from "../utils/fetchApi";

export default function VideoCard({ video, channelDetail }) {
  const description = video.snippet.title.slice(0, 60);
  const [vidChannelPic, setvidChannelPic] = useState("");

  useEffect(() => {
    fetchApi(
      `channels?part=snippet%2Cstatistics&id=${video?.snippet?.channelId}`
    ).then((data) => {
      setvidChannelPic(data?.items[0]?.snippet?.thumbnails?.default?.url);
      console.log(vidChannelPic);
    });
  }, []);

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
              dangerouslySetInnerHTML={{ __html: description.slice(0, 60) }}
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
          <Box className="d-flex align-items-center justify-content-start">
            <Avatar src={vidChannelPic} sx={{ width: 24, height: 24 }} />
            <Typography
              variant="subtitle2"
              color="white"
              fontWeight="semibold"
              m="5px"
              style={{
                textOverflow: "ellipsis",
              }}
            >
              {video?.snippet?.channelTitle.slice(0, 40) || demoChannelUrl}
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
}
