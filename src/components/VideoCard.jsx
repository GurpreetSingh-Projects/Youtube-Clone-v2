import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { demoChannelUrl } from "../utils/constants";
import { useState } from "react";
import { converter } from "../utils/constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { setCurrVidId } from "../features/VidIds/vidIdsSlice";
import { setChannelId } from "../features/CurrChannel/currChannelSlice";
export default function VideoCard({ video, channelView }) {
  const description = video.snippet.title;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function cardHovered() {
    setIsHovered(true);
  }

  function cardNotHovered() {
    setIsHovered(false);
  }

  var currVidDetails = "",
    currChannels = "";
  currChannels = useSelector((state) => state.channels.channels.items);
  try {
    currVidDetails = currChannels?.find(
      (item) => item?.id == video?.snippet?.channelId
    );
  } catch {
    console.log("Check VideoCard Component for details");
  }
  const dispatch = useDispatch();
  function currVidSetter(id) {
    dispatch(setCurrVidId(id));
  }
  function setChannelUrl(channelId) {
    dispatch(setChannelId(channelId));
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
      <Link
        to={`/video/${video?.id}`}
        onClick={() => {
          currVidSetter(video?.id);
        }}
      >
        {/* This Is Thumbnail */}
        <CardMedia
          component="img"
          loading="lazy"
          className="cardImg"
          image={video?.snippet?.thumbnails?.medium?.url}
          alt={video?.snippet?.title}
          sx={{ cursor: "pointer" }}
        />
        {/* <div className="text-white">
          {moment.duration(video?.contentDetails?.duration).humanize()}
        </div> */}
        {isHovered && (
          <VideoPlayer
            isPlaying={isHovered}
            videoId={video?.id}
            videoCardCall={true}
          />
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
        {channelView || (
          <Link
            to={`/channel/${video?.snippet?.channelId}`}
            onClick={() => {
              setChannelUrl(video?.snippet?.channelId);
            }}
          >
            <img
              className="avatar"
              src={currVidDetails?.snippet?.thumbnails?.default?.url}
            />
          </Link>
        )}

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
              {converter(video?.statistics?.subscriberCount)}
              {/* {converter(video?.statistics?.viewCount)} */}
              {/* <br /> */}
              &nbsp;&#124;&nbsp;
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
