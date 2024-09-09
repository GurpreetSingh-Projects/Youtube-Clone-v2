import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Skeleton,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { useState, useEffect, Suspense } from "react";
import { fetchApi } from "../utils/fetchApi";

export default function VideoCard({ video, channelDetail }) {
  const description = video.snippet.title;
  const [vidChannelPic, setvidChannelPic] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchApi(
      `channels?part=snippet%2Cstatistics&id=${video?.snippet?.channelId}`
    ).then((data) => {
      setvidChannelPic(data?.items[0]?.snippet?.thumbnails?.default?.url);
      console.log(vidChannelPic);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>
      <Skeleton variant="rectangular" sx={{ height: 180, margin: 1 }} />
      <div className="d-flex mt-3 ">
        <Skeleton
          className="me-3"
          variant="circular"
          sx={{ width: 50, height: 50 }}
        />
        <div className="">
          <Skeleton
            className="mb-2"
            variant="rectangular"
            sx={{ height: 25 }}
          />
          <Skeleton variant="rectangular" sx={{ width: 270, height: 15 }} />
        </div>
      </div>
    </div>
  ) : (
    <Card
      className="videoCard"
      sx={{
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
          sx={{ objectFit: "cover" }}
        />
      </Link>
      <CardContent
        sx={{
          display: "flex",
          backgroundColor: "#1e1e1e",
          height: "100px",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Link to={`/video/${video?.id?.videoId}`}>
          <Avatar
            src={vidChannelPic}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
        </Link>
        <Link
          to={
            video?.snippet?.channelId
              ? `/channel/${video?.snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Box className="">
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              <div
                className="my-2 vidDescription"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Typography>
            <Typography
              variant="subtitle2"
              color="grey"
              fontWeight="semibold"
              sx={{
                textOverflow: "ellipsis",
              }}
            >
              {video?.snippet?.channelTitle.slice(0, 40) || demoChannelUrl}
              <b />
              {}
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
}
