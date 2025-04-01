import ReactPlayer from "react-player/lazy";
import { motion } from "framer-motion";
const VideoPlayer = (props) => {
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
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUp}
      exit="exit"
      sx={{
        background: "#00000000",
        padding: 0,
        margin: 0,
        zIndex: 999,
        position: "fixed",
        inset: 0,
      }}
    >
      <ReactPlayer
        loading
        className={`react-player mb-3 mb-md-0 ${props?.videoCardCall}`}
        url={`https://www.youtube.com/watch?v=${props?.videoId}`}
        playing={props?.isPlaying}
        muted
        controls={!props?.videoCardCall}
        style={{ zIndex: -1 }}
        config={{
          youtube: {
            playerVars: {
              modestBranding: true,
              cc_load_policy: 1,
              cc: "en",
              rel: 0,
              quality: "hd360",
            },
          },
        }}
      />
    </motion.div>
  );
};

export default VideoPlayer;
