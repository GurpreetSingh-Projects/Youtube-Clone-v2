import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Typography
      className="copyright w-100 text-center p-1"
      variant="body2"
      sx={{
        mt: 1.5,
        color: "white",
        // background: "rgba(0,0,0,0.5)",
        background: "rgba(0,0,0,1)",
        backdropFilter: "blur(5px)",
        position: "fixed",
        bottom: 0,
      }}
    >
      Copyright ©&nbsp;
      <a
        className="text-primary"
        target="_blank"
        href="https://github.com/GurpreetSingh-Projects"
      >
        GurpreetSingh-Projects
      </a>
    </Typography>
  );
};

export default Footer;
