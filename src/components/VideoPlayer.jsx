import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = (props) => {
  return (
    <ReactPlayer
      className={`react-player mb-3 mb-md-0 ${props?.videoCardCall}`}
      url={`https://www.youtube.com/watch?v=${props?.videoId}`}
      playing={true}
      muted
      controls={!props?.videoCardCall}
      style={{ zIndex: -1 }}
    />
  );
};

export default VideoPlayer;
