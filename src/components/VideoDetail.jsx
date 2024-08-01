import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
function VideoDetail() {
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
  return (
    <Box sx={{ background: "inherit", position: "sticky" }}>
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
            <Typography color="white" variant="h6" fontWeight="bold" p={2}>
              {currVid?.snippet?.localized?.title}
            </Typography>
            <Typography
              color="grey"
              variant="subtitle2"
              fontWeight="normal"
              p={2}
              pt={0}
              textAlign="justify"
              letterSpacing={-0.5}
              textWrap="no-wrap"
            >
              {currVid?.snippet?.localized?.description}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
