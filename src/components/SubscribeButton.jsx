import { Box } from "@mui/material";
import React from "react";

function SubscribeButton(props) {
  return (
    <button className={`subScribeBtn ${props.marginStart}`}>
      <Box className="text">Subscribe</Box>
    </button>
  );
}

export default SubscribeButton;
