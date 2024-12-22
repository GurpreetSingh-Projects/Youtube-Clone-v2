import { Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./index";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const Videos = ({ suggested }) => {
  const videos = useSelector((state) => state.videos.videos);

  // console.log("Videos= " + JSON.stringify(videos));
  const slideUp = {
    hidden: { opacity: 0.5 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          {item.id.videoId && <VideoCard video={(item, counter)} />}
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
      {videos.items
        ? videos.items.map((item, idx) => (
            <motion.div variants={itemVariants} className="videoCard" key={idx}>
              {item.id && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </motion.div>
          ))
        : "Loading..."}
    </motion.div>
  );
};

export default Videos;
