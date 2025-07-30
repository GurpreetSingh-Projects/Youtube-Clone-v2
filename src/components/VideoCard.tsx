import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { demoChannelUrl, handleScroll } from "../utils/constants";
import { useEffect, useState } from "react";
import { converter } from "../utils/constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { setCurrVidId } from "../features/VidIds/vidIdsSlice";
import { setChannelId } from "../features/CurrChannel/currChannelSlice";
export default function VideoCard({ video, channelView, recommendedVideos }) {
  const description = video.snippet.title;
  const navigate = useNavigate();
  const replaceUrl = (url) => {
    navigate(url, { replace: true });
  };
  const [isHovered, setIsHovered] = useState(false);
  const [link, setLink] = useState("");
  const [channel, setChannel] = useState("");
  // console.log(video?.id?.videoId);
  function cardHovered() {
    setIsHovered(true);
  }

  function cardNotHovered() {
    setIsHovered(false);
  }
  const category = useSelector((state) => state.category.selectedCategory);

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
  useEffect(() => {
    if (recommendedVideos) {
      setLink(video?.id?.videoId);
    } else if (channelView) {
      setLink(video?.snippet?.resourceId?.videoId);
    } else {
      setLink(video?.id);
    }
  }, [category, video?.id]);

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
      onClick={handleScroll}
    >
      <Link
        to={`/video/${link}`}
        onClick={() => {
          currVidSetter(link);
          setChannelUrl(video?.snippet?.channelId);
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

        {isHovered && (
          <VideoPlayer
            isPlaying={isHovered}
            videoId={video?.id}
            videoCardCall={true}
          />
        )}
        <div className="text-white vidDuration">
          {moment.duration(video?.contentDetails?.duration).minutes()}:
          {moment
            .duration(video?.contentDetails?.duration)
            .seconds()
            .toString()
            .padStart(2, "0")}
        </div>
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

        <Link
          to={`/video/${link}`}
          onClick={() => {
            currVidSetter(link);
            setChannelUrl(video?.snippet?.channelId);
          }}
        >
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
