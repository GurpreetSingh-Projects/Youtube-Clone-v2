import { Box, Stack } from "@mui/material";
import React, { createContext, useContext } from "react";
import { ChannelCard, ChannelDetail, VideoCard } from "./index";
import { CreateContext } from "../App";
const Videos = (suggested) => {
  const { videos } = useContext(CreateContext);
  return suggested ? (
    <div className="suggestedvideos">
      {videos.map((item, idx) => (
        <Box className="videoCard" key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
        </Box>
      ))}
    </div>
  ) : (
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
