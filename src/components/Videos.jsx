import { Box } from "@mui/material";
import { useContext } from "react";
import { ChannelCard, VideoCard } from "./index";
import { CreateContext } from "../App";
import { motion } from "framer-motion";
const Videos = ({ suggested }) => {
  const { videos } = useContext(CreateContext);
  // console.log(videos);

  const slideUp = {
    hidden: { opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return suggested ? (
    <motion.div
      initial="hidden"
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
      initial="hidden"
      animate="visible"
      variants={slideUp}
      className="videos"
    >
      {videos.map((item, idx) => (
        <motion.div variants={itemVariants} className="videoCard" key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Videos;
