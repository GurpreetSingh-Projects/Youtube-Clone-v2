import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { demoChannelUrl } from "../utils/constants";
import { useState, useEffect, createContext, useContext } from "react";
import { fetchApi } from "../utils/fetchApi";
import { converter } from "../utils/constants";
import moment from "moment";
import { useSelector } from "react-redux";

export const VidStats = createContext();

export default function VideoCard({ video }) {
  const description = video.snippet.title;
  const navigate = useNavigate();
  const { currVid, setCurrVid } = useState([]);
  const currVidId = useSelector((state) => state.channels.channels);
  const currVidDetails = useSelector((state) =>
    // state.search.search.items.find(
    //   (item) => item.snippet.channelId == currVidId
    // )
    state.channels.channels.items.find(
      (item) => item.id == video.snippet.channelId
    )
  );

  return (
    <Card
      className="videoCard"
      sx={{
        boxShadow: "none",
        borderRadius: "3px",
      }}
    >
      <Link to={`/video/${video?.id}`}>
        <CardMedia
          component="img"
          loading="lazy"
          className="cardImg"
          image={video?.snippet?.thumbnails?.medium?.url}
          alt={video?.snippet?.title}
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
            src={currVidDetails?.snippet?.thumbnails?.default?.url}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
        </Link>
        <Link to={`/video/${video?.id?.videoId}`}>
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
