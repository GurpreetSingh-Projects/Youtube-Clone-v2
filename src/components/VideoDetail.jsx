import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
function VideoDetail() {
  console.log("Hi, videodetail here :)");
  const { id } = useParams();
  const [currVid, setCurrVid] = useState("");
  const [len, setLen] = useState(430);
  console.log(currVid);

  useEffect(() => {
    fetchApi(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`).then(
      (data) => {
        setCurrVid(data.items[0]);
      }
    );
  }, [id]);
  function viewDescription() {
    if (len == 430) {
      setLen(currVid.snippet.localized.description.length);
      document.getElementById("more").style.display = "none";
      document.getElementById("hide").style.display = "inline";
    } else setLen(430);
  }
  function hideDescription() {
    setLen(430);
    document.getElementById("hide").style.display = "none";
    document.getElementById("more").style.display = "inline";
  }

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
            >
              {currVid?.snippet?.localized?.description.slice(0, len)}
              <span
                id="more"
                onClick={viewDescription}
                style={{ cursor: "pointer" }}
                className="text-white cursor-pointer ms-1"
              >
                more...
              </span>
              <span
                onClick={hideDescription}
                id="hide"
                style={{ display: "none", cursor: "pointer" }}
                className="text-white cursor-pointer ms-1"
              >
                ...hide
              </span>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
