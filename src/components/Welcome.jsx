import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Footer from "./Footer";
// import logo from "/assets/images/hq-logo.webp";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import App from "../App";

const Welcome = () => {
  const [welcome, setWelcome] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setWelcome(!welcome);
    }, 3500);
  }, []);

  const AnimatedBox = motion(Box);
  const riseUp = {
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
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    transition: {
      staggerChildren: 0.35,
      duration: 2,
    },
  };
  const youtube = ["Y", "O", "U", "T", "U", "B", "E"];

  return (
    <>
      {welcome && (
        <AnimatedBox
          variants={riseUp}
          initial="hidden3"
          animate="visible"
          // exit="exit"
          key="welcome"
          component="div"
          className="welcomeWrapper d-flex align-items-center justify-content-center backgroundImg text-white w-100 h-100"
        >
          <AnimatedBox component="div" className="d-block">
            {/* <img className="logoImg" src={logo} alt="" /> */}
            <AnimatedBox
              variants={riseUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={riseUp.transition}
              className="logoImg"
            >
              {youtube.map((char) => (
                <motion.span variants={riseUp} key={char}>
                  {char}
                </motion.span>
              ))}
            </AnimatedBox>
            <AnimatedBox
              variants={riseUp}
              initial="hidden2"
              animate="visible"
              exit="hidden"
              transition={{
                staggerChildren: 0.25,
                duration: 2,
              }}
              className="youtubeV2"
            >
              <motion.h1 variants={riseUp} transition={{ delay: 2 }}>
                v
              </motion.h1>
              <motion.h1 variants={riseUp} transition={{ delay: 2.15 }}>
                2
              </motion.h1>
              <motion.h1 variants={riseUp} transition={{ delay: 2.3 }}>
                .
              </motion.h1>
              <motion.h1 variants={riseUp} transition={{ delay: 2.45 }}>
                0
              </motion.h1>
            </AnimatedBox>
          </AnimatedBox>
        </AnimatedBox>
      )}

      {/* {!welcome && <App />} */}
      <App />
    </>
  );
};

export default Welcome;
