import { Box, Stack } from "@mui/material";
import React, { createContext, useContext } from "react";
import { ChannelCard, ChannelDetail, VideoCard } from "./index";
import { CreateContext } from "../App";
const Videos = (pattern) => {
  const { videos } = useContext(CreateContext);
  if (pattern == "column") {
    document
      .getElementsByClassName("videos")
      .classList.replace("videos", "col-12 w-100");
  }
  return (
    <div className="videos">
      {videos.map((item, idx) => (
        <Box className="videoCard" key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </div>
  );
};

export default Videos;
