import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { converter, demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => {
  const navigate = useNavigate();
  const replaceUrl = (url) => {
    navigate(url, { replace: true });
  };

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
        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {converter(channelDetail?.statistics?.subscriberCount)} Subscribers
          </Typography>
        )}
      </CardContent>
    </Box>
  );
};

export default ChannelCard;
