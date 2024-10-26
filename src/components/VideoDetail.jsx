import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, Link } from "react-router-dom";
import { fetchApi, fetchApi1 } from "../utils/fetchApi";
import { CreateContext } from "../App";
import Videos from "./Videos";
import { VidStats } from "./VideoCard";
function VideoDetail() {
  const { id } = useParams();
  const [currVidDetails, setCurrVidDetails] = useState(null);
  const { videos, setVideos } = useContext(CreateContext);
  // console.log("Searched for keyword - " + id);
  useEffect(() => {
    fetchApi1(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
    ).then((res) => {
      setCurrVidDetails(res.items[0]);
    });
    alert("Fetched Current details - " + JSON.stringify(currVidDetails));

    // related videos
    fetchApi(`search?part=snippet&q=${id}&type=video`).then((res) => {
      setVideos(res.items);
    });
  }, [id]);

  function extendDescription() {
    var val = document.getElementById("vidDescription").style.webkitLineClamp;
    if (val == 99)
      document.getElementById("vidDescription").style.webkitLineClamp = 2;
    else document.getElementById("vidDescription").style.webkitLineClamp = 99;
  }
  return (
    <Box
      className="vidDetail d-flex"
      sx={{ background: "inherit", position: "sticky" }}
    >
      <Stack className="col-9" direction={{ xs: "column", md: "row" }}>
        <Box flex={1} className="mb-5">
          <Box sx={{ width: "100%", position: "sticky", top: "80px" }}>
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={true}
              muted
              controls
            />
            <Typography
              color="white"
              variant="h6"
              fontWeight="bold"
              px={3}
              mt={3}
            >
              {currVidDetails?.snippet?.localized?.title}
            </Typography>
            <div
              color="grey"
              id="vidDescription"
              className="vidDescription text-white px-4 mt-3"
              onClick={extendDescription}
              style={{ cursor: "pointer" }}
            >
              {currVidDetails?.snippet?.localized?.description}
            </div>

            <Stack
              direction="row"
              className="d-flex w-100 justify-content-between px-4 mt-3"
              sx=""
            >
              <Link to={`/channel/${currVidDetails?.snippet?.channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "6" }} color="#fff">
                  {currVidDetails?.snippet?.channelTitle}
                </Typography>
              </Link>
              <Box className="d-flex gap-2">
                <Typography variant="body1" sx={{ opacity: 0.7 }} color="#fff">
                  {currVidDetails?.statistics?.viewCount}
                  &nbsp; Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }} color="#fff">
                  {currVidDetails?.statistics?.likeCount} &nbsp;Likes
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Stack className="col-3" direction="column">
        <Videos suggested="true" />
      </Stack>
    </Box>
  );
}

export default VideoDetail;
