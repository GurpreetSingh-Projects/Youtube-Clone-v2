import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => {
  const navigate = useNavigate();
  const replaceUrl = (url) => {
    navigate(url, { replace: true });
  };
  console.log("Hi, ChannelCard here :)");
  var subs = channelDetail?.statistics?.subscriberCount;
  if (subs >= 1500 && subs < 100000) {
    subs = subs / 100000;
    subs += "k";
  } else if (subs >= 100000) {
    subs = subs / 1000000;
    subs += "M";
  }
  console.log(subs);

  return (
    <Box
      className="d-flex align-items-center justify-content-center"
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        margin: "auto",
        marginTop,
      }}
    >
      <CardContent
        onClick={() => replaceUrl(`/channel/${channelDetail?.id?.channelId}/`)}
        className="d-flex align-items-center justify-content-center"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <CardMedia
          className="channelProfilePic"
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.title}
          sx={{
            borderRadius: "50%",
            height: "180px",
            width: "180px",
            border: "1px solid grey",
          }}
        />
        <Typography variant="h6">{channelDetail?.snippet?.title}</Typography>
        {subs && <Typography>{subs} Subscribers</Typography>}
      </CardContent>
    </Box>
  );
};

export default ChannelCard;
