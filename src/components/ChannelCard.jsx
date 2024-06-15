import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail }) => {
  console.log(channelDetail);
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { md: "320px", xs: "356px" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link to={`channel/${channelDetail?.id?.channelId}/`}>
        <CardContent
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
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
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
              {channelDetail?.statistics?.subscriberCount} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
