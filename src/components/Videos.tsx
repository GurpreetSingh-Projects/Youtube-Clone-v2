import { Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./index";
import { motion, transform } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TimedOut from "./TimedOut";
import VidSkeleton from "./VidSkeleton";
import VidMapper from "./VidMapper";

const Videos = ({ suggested, channelView, recommended }) => {
  const videos = useSelector((state) => state.videos.videos);
  const recVideos = useSelector((state) => state.videos.recommendedVideos);
  const recommendVideos = useSelector((state) => state.videos.recommendVideos);
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

  return (
    <>
      {/* All Videos */}
      {!suggested &&
        !channelView &&
        !recommended &&
        (videos.items ? (
          <>
            <VidMapper videos={videos} class="videos" />
          </>
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
        ))}
      {/* Suggested Videos */}
      {/* {recommended && (
        <div className="suggestedvideos">
          {recommendVideos.items ? (
            <VidMapper
              videos={recommendVideos}
              recommendedVideos="true"
              class="videoCardSuggested"
            />
          ) : (
            <div className="text-white">
              {timedOut ? (
                <TimedOut />
              ) : (
                <VidSkeleton suggested={"suggested"} />
              )}
            </div>
          )}
        </div>
      )} */}
      {recommended &&
        (videos.items ? (
          <>
            <VidMapper videos={videos} class="videos" />
          </>
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
        ))}
      {/* Channel Videos */}
      {channelView && (
        <div>
          {recVideos?.items ? (
            <Box className="videos">
              <VidMapper
                videos={recVideos}
                channelView={true}
                class="videoCardSuggested"
              />
            </Box>
          ) : (
            <Box className="text-white" sx={{ minHeight: "500px" }}>
              {timedOut ? (
                <TimedOut />
              ) : (
                <VidSkeleton suggested={"suggested"} />
              )}
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default Videos;
