import { Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./index";
import { motion, transform } from "framer-motion";
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

  const outerVariant = {
    hidden: {
      scale: 0.95,
      y: 10,
      opacity: 0.5,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0.5,
      scale: 0,
    },
  };

  const innerVariant = {
    hidden: {
      opacity: 0.8,
      scale: 0.9,
      y: 0,
    },
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
    <div className="suggestedvideos">
      {videos.items ? (
        videos.items.map((item, idx) => (
          <motion.div
            // variants={innerVariant}
            initial="hidden"
            animate="visible"
            variants={outerVariant}
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
    </div>
  ) : (
    <div>
      {videos.items ? (
        <motion.div
          variants={outerVariant}
          className="videos"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {videos.items.map((item, idx) => (
            <motion.div variants={innerVariant} key={idx}>
              {item.id && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={outerVariant}
          className="timedOut"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {timedOut ? <TimedOut /> : <VidSkeleton />}
        </motion.div>
      )}
    </div>
  );
};

export default Videos;
