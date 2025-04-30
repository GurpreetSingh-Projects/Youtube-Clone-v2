import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
const VidMapper = (props) => {
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
  return (
    <>
      <motion.div
        variants={outerVariant}
        className={`${props?.class}`}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {props?.videos?.items.map((item, idx) => (
          <motion.div variants={innerVariant} key={idx}>
            {item.id && (
              <VideoCard
                video={item}
                channelView={props?.channelView}
                recommendedVideos={props?.recommendedVideos}
              />
            )}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default VidMapper;
