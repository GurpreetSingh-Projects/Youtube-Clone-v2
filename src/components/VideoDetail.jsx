import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
function VideoDetail() {
  console.log("Hi, videodetail here :)");
  const { id } = useParams();
  const [currVid, setCurrVid] = useState("");
  console.log(currVid);

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
      sx={{ background: "inherit", position: "sticky", marginBottom: "50vh" }}
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
            >
              {currVid?.snippet?.localized?.description}
            </div>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
