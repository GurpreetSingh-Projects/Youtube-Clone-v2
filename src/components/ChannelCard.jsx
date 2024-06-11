import { Box, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail }) => {
  console.log(channelDetail.snippet.thumbnails.high.url);
  return (
    <>
      <Box sx={{ boxShadow: "none", borderRadius: "20px" }}>
        <Link to={`channel/${channelDetail?.id?.channelId}/`}>
          <CardContent
            sx={{
              display: "flex",
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
              sx={{ borderRadius: "50%", height: "180px", width: "180px" }}
            ></CardMedia>
          </CardContent>
        </Link>
      </Box>
    </>
  );
};

export default ChannelCard;
