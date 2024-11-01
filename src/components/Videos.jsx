import { Box, Stack } from "@mui/material";
import React, { createContext, useContext } from "react";
import { ChannelCard, ChannelDetail, VideoCard } from "./index";
import { CreateContext } from "../App";
import { motion } from "framer-motion";
const Videos = ({ suggested }) => {
  const { videos } = useContext(CreateContext);
  // console.log(videos);

  const slideUp = {
    hidden: { opacity: 1, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };
  return suggested ? (
    <motion.div
      inital="hidden"
      animate="visible"
      variants={slideUp}
      className="suggestedvideos"
    >
      {videos.map((item, idx) => (
        <Box className="videoCard" key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
        </Box>
      ))}
    </motion.div>
  ) : (
    <motion.div
      inital="hidden"
      animate="visible"
      variant="slideUp"
      className="videos"
    >
      {videos.map((item, idx) => (
        <Box className="videoCard" key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </motion.div>
  );
};

export default Videos;
