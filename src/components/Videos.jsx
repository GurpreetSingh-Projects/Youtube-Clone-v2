import { Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./index";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TimedOut from "./TimedOut";
import VidSkeleton from "./VidSkeleton";
const Videos = ({ suggested }) => {
  const videos = useSelector((state) => state.videos.videos);
  const [timedOut, setTimedOut] = useState(false);

  function timeout() {
    setTimeout(() => {
      setTimedOut(true);
    }, 10000);
  }
  useEffect(() => {
    timeout();
  }, []);

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
      {videos.items ? (
        videos.items.map((item, idx) => (
          <motion.div
            variants={itemVariants}
            className="videoCardSuggested"
            key={idx}
          >
            {item.id && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </motion.div>
        ))
      ) : (
        <div className="text-white">
          {timedOut ? <TimedOut /> : <VidSkeleton suggested={"suggested"} />}
        </div>
      )}
    </motion.div>
  ) : (
    <div>
      {videos.items ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUp}
          className="videos"
        >
          {videos.items.map((item, idx) => (
            <motion.div variants={itemVariants} key={idx}>
              {item.id && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-white">
          {timedOut ? <TimedOut /> : <VidSkeleton />}
        </div>
      )}
    </div>
  );
};

export default Videos;
