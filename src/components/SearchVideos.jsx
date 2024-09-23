import { Box, Stack } from "@mui/material";
import React, { createContext, useContext } from "react";
import { ChannelCard, VideoCard } from "./index";
import { SearchContext } from "./SearchFeed";
const SearchVideos = () => {
  const videos = useContext(SearchContext);
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

export default SearchVideos;
