import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Zoom,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { demoChannelUrl } from "../utils/constants";
import { useState, useEffect, createContext, useContext } from "react";
import { fetchApi } from "../utils/fetchApi";
import { converter } from "../utils/constants";

import VidSkeleton from "./VidSkeleton";
import { CreateContext } from "../App";

export const VidStats = createContext();

export default function VideoCard({ video, channelDetail }) {
  const [stats, setStats] = useState(null);
  const description = video.snippet.title;
  const navigate = useNavigate();
  const { currVid, setCurrVid } = useContext(CreateContext);

  useEffect(() => {
    fetchApi(
      `channels?part=snippet%2Cstatistics&id=${video?.snippet?.channelId}`
    ).then((res) => {
      console.log(res);
      setStats(res);
    });
  }, [video.snippet.channelId]);
  return (
    <Zoom in={true} style={{ transitionDelay: "0s" }}>
      <Card
        className="videoCard"
        sx={{
          boxShadow: "none",
          borderRadius: "3px",
        }}
      >
        <Link
          to={`/video/${video?.id?.videoId}`}
          onClick={() => {
            setCurrVid(video);
          }}
        >
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
          <Link
            to={
              video?.snippet?.channelId
                ? `/channel/${video?.snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Avatar
              src={stats?.items[0]?.snippet?.thumbnails?.default?.url}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
          </Link>
          <Link to={`/video/${video?.id?.videoId}`}>
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
                {video?.snippet?.channelTitle.slice(0, 40) || demoChannelUrl}{" "}
                &nbsp;
                {converter(stats?.items[0]?.statistics?.subscriberCount)} &nbsp;
                {converter(stats?.items[0]?.statistics?.viewCount)}
                <b />
              </Typography>
            </Box>
          </Link>
        </CardContent>
      </Card>
    </Zoom>
  );
}
