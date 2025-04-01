import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { demoChannelUrl } from "../utils/constants";
import { useState } from "react";
import { converter } from "../utils/constants";
import moment from "moment";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
export default function VideoCard({ video }) {
  const description = video.snippet.title;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function cardHovered() {
    setIsHovered(true);
  }

  function cardNotHovered() {
    setIsHovered(false);
  }

  var currVidDetails = "";
  try {
    currVidDetails = useSelector((state) =>
      state.channels.channels.items.find(
        (item) => item.id == video.snippet.channelId
      )
    );
  } catch (error) {
    console.log("Error in currVidDetails .find() logic");
  }

  return (
    <Card
      className="videoCard"
      id={video?.id}
      sx={{
        boxShadow: "none",
        borderRadius: "3px",
        backgroundColor: "#1e1e1e",
      }}
      onMouseEnter={cardHovered}
      onMouseLeave={cardNotHovered}
    >
      <Link to={`/video/${video?.id}`}>
        <CardMedia
          component="img"
          loading="lazy"
          className="cardImg"
          image={video?.snippet?.thumbnails?.medium?.url}
          alt={video?.snippet?.title}
        />
        {isHovered ? (
          <VideoPlayer
            isPlaying={isHovered}
            videoId={video?.id}
            videoCardCall={true}
          />
        ) : (
          <></>
        )}
      </Link>
      <CardContent
        sx={{
          display: "flex",
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
          <img
            className="avatar"
            src={currVidDetails?.snippet?.thumbnails?.default?.url}
          />
        </Link>
        <Link to={`/video/${video?.id}`}>
          <Box className="">
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              <div
                className="vidDescription"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Typography>
            <Typography
              variant="subtitle2"
              className="vidDetails pt-1"
              color="#aaa"
              fontWeight="semibold"
              sx={{
                textOverflow: "ellipsis",
              }}
            >
              {video?.snippet?.channelTitle.slice(0, 40) || demoChannelUrl}
              &nbsp;
              {converter(video?.statistics?.subscriberCount)} &nbsp;
              {/* {converter(video?.statistics?.viewCount)} */}
              <br />
              <span className="text-capitalize">
                {moment(video?.snippet?.publishedAt, "YYYYMMDD").fromNow()}
              </span>
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
}
