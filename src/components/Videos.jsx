import { Box, Stack } from "@mui/material";
import React from "react";
import { ChannelCard, VideoCard } from "./index";
const Videos = ({ videos }, { channelDetail }) => {
  console.log(videos);
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
