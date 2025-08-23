import { Box, BoxProps } from "@mui/material";
import { motion, MotionProps, Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { App } from "../App";
import { WelcomeProps } from "../utils/types";

const Welcome: React.FC<WelcomeProps> = (props) => {
  const [welcome, setWelcome] = useState<boolean>(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcome((prevState) => !prevState);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const AnimatedBox = motion<BoxProps>(Box);

  const riseUp: Variants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      y: -100,
    },
    hidden2: {
      scale: 0.5,
      opacity: 0,
      y: 100,
    },
    hidden3: {
      scale: 1,
      opacity: 1,
      y: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.25,
        duration: 1.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const riseUp2: Variants = {
    hidden2: {
      scale: 0.5,
      opacity: 0,
      y: 100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.15,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const yt: string = "YOUTUBE";
  const version: string = "v2.0";
  const youtubeText: string[] = useMemo(() => yt.split(""), [yt]);
  const versionText: string[] = useMemo(() => version.split(""), [version]);

  return (
    <>
      {welcome ? (
        <AnimatedBox
          variants={riseUp}
          initial="hidden3"
          animate="visible"
          component="div"
          className="welcomeWrapper d-flex align-items-center justify-content-center backgroundImg text-white w-100 h-100"
        >
          <AnimatedBox component="div" className="d-block">
            <AnimatedBox
              variants={riseUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={riseUp.transition}
              className="logoImg"
            >
              {youtubeText.map((char: string, index: number) => (
                <motion.span variants={riseUp} key={index}>
                  {char}
                </motion.span>
              ))}
            </AnimatedBox>
            <AnimatedBox
              variants={riseUp2}
              initial="hidden2"
              animate="visible"
              exit="hidden"
              className="youtubeV2"
            >
              {versionText.map((char: string, index: number) => {
                return (
                  <motion.h1 key={index} variants={riseUp2}>
                    {char}
                  </motion.h1>
                );
              })}
            </AnimatedBox>
          </AnimatedBox>
        </AnimatedBox>
      ) : (
        <>{props.firstRender && <App />}</>
      )}
    </>
  );
};

export default Welcome;
