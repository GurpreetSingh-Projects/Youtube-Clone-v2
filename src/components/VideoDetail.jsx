import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, Link } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import { CreateContext } from "./Feed";
import { Videos } from ".";
function VideoDetail() {
  console.log("Hi, videodetail here :)");
  const { id } = useParams();
  const [currVid, setCurrVid] = useState("");
  console.log(currVid);
  const videos = useContext(CreateContext);

  useEffect(() => {
    fetchApi(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`).then(
      (data) => {
        setCurrVid(data.items[0]);
      }
    );
  }, [id]);
  function extendDescription() {
    var val = document.getElementById("vidDescription").style.webkitLineClamp;
    if (val == 99)
      document.getElementById("vidDescription").style.webkitLineClamp = 2;
    else document.getElementById("vidDescription").style.webkitLineClamp = 99;
  }

  return (
    <Box
      className="vidDetail"
      sx={{ background: "inherit", position: "sticky" }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
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
              {currVid?.snippet?.localized?.title}
            </Typography>
            <div
              color="grey"
              id="vidDescription"
              className="vidDescription text-white px-4 mt-3"
              onClick={extendDescription}
              style={{ cursor: "pointer" }}
            >
              {currVid?.snippet?.localized?.description}
            </div>

            <Stack
              direction="row"
              className="d-flex w-100 justify-content-between px-4 mt-3"
              sx=""
            >
              <Link to={`/channel/${currVid?.snippet?.channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: "6" }} color="#fff">
                  {currVid?.snippet?.channelTitle}
                </Typography>
              </Link>
              <Box className="d-flex gap-2">
                <Typography variant="body1" sx={{ opacity: 0.7 }} color="#fff">
                  {currVid?.statistics?.viewCount}
                  &nbsp; Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }} color="#fff">
                  {currVid?.statistics?.likeCount} &nbsp;Likes
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box className="bg-red" flex={1}>
        {console.log("hey" + videos)}
      </Box>
    </Box>
  );
}

export default VideoDetail;
