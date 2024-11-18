import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, Link } from "react-router-dom";
import { fetchApi, fetchApi1 } from "../utils/fetchApi";
import { converter } from "../utils/constants";
import { CreateContext } from "../App";
import Videos from "./Videos";
import { VidStats } from "./VideoCard";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

function VideoDetail() {
  const { id } = useParams();
  const [currVidDetails, setCurrVidDetails] = useState(null);
  const { videos, setVideos } = useContext(CreateContext);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  // console.log("Searched for keyword - " + id);
  useEffect(() => {
    fetchApi1(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
    ).then((res) => {
      setCurrVidDetails(res.items[0]);
    });
    // related videos
    fetchApi(`search?part=snippet&q=${id}`).then((res) => {
      setVideos(res.items);
    });
  }, [id]);
  console.log("Fetched Current details - " + JSON.stringify(currVidDetails));

  function extendDescription() {
    var val = document.getElementById("vidDescription").style.webkitLineClamp;
    if (val == 99)
      document.getElementById("vidDescription").style.webkitLineClamp = 2;
    else document.getElementById("vidDescription").style.webkitLineClamp = 99;
  }
  return (
    <Box
      className="vidDetail d-flex flex-wrap flex-column flex-md-row"
      sx={{ background: "inherit", position: "sticky" }}
    >
      <Stack className="col-md-9" direction={{ xs: "column", md: "row" }}>
        <Box flex={1} className="mb-5">
          <Box sx={{ width: "100%", position: "sticky", top: "80px" }}>
            <ReactPlayer
              className="react-player mb-3 mb-md-0"
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={true}
              muted
              controls
            />

            <Typography
              variant="h6"
              fontWeight="bold"
              className=" px-1 mt-3 px-md-3 mt-md-3 text-white"
            >
              {currVidDetails?.snippet?.localized?.title}
            </Typography>
            <div
              color="grey"
              id="vidDescription"
              className="vidDescription text-white px-1 px-md-4 mt-0 mt-md-3"
              onClick={extendDescription}
              style={{ cursor: "pointer" }}
            >
              {currVidDetails?.snippet?.localized?.description}
            </div>

            <Stack
              direction="row"
              className="d-flex align-items-center w-100 justify-content-between px-2 px-md-4 mt-2 mt-md-3"
            >
              <Link
                className="d-flex align-items-center gap-1 gap-md-2 mt-2 mt-md-0"
                to={`/channel/${currVidDetails?.snippet?.channelId}`}
              >
                <Avatar
                  src={currVidDetails?.snippet?.thumbnails?.default?.url}
                ></Avatar>
                <Typography sx={{ sm: "6", md: "6" }} color="#fff">
                  {currVidDetails?.snippet?.channelTitle}
                </Typography>
              </Link>
              <Box className="d-flex gap-2">
                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                >
                  <IconButton className="text-white">
                    <WhatshotIcon />
                  </IconButton>
                  {converter(currVidDetails?.statistics?.viewCount)}
                </Typography>
                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                  onClick={() => {
                    setLiked(!liked);
                    if (disliked == true) setDisliked(!disliked);
                  }}
                >
                  <IconButton className="text-white">
                    {liked ? <ThumbUp /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                  {converter(currVidDetails?.statistics?.likeCount)}
                </Typography>

                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                  onClick={() => {
                    setDisliked(!disliked);
                    if (liked == true) setLiked(!liked);
                  }}
                >
                  <IconButton className="text-white">
                    {disliked ? <ThumbDown /> : <ThumbDownOutlinedIcon />}
                  </IconButton>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Stack className="col-md-3" direction="column">
        <Videos suggested="true" />
      </Stack>
    </Box>
  );
}

export default VideoDetail;
