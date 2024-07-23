import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import { Box, Card, Hidden, Typography } from "@mui/material";
import { ChannelCard, Videos } from "./index";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);

  console.log(channelDetail, channelVideos);

  const { id } = useParams();

  useEffect(() => {
    fetchApi(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });

    fetchApi(
      `search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`
    ).then((data) => {
      setChannelVideos(data.items);
    });
  }, [id]);
  return (
    <>
      <Box>
        <Box>
          <div
            style={{
              zIndex: 100,
              height: 200,
              objectFit: "cover",
              objectPosition: "center center",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={channelDetail?.brandingSettings?.image?.bannerExternalUrl}
              style={{ width: "100%" }}
              alt=""
            />
          </div>
        </Box>
        <ChannelCard
          channelDetail={channelDetail}
          marginTop="-100px"
        ></ChannelCard>
      </Box>
      <Box className="d-flex align-items-center justify-content-center">
        <Typography
          style={{
            fontSize: "15px",
            color: "white",
            textAlign: "center",
            margin: "20px",
            marginTop: "-20px",
            maxWidth: "75vw",
            textWrap: "wrap",
            textOverflow: "ellipsis",
          }}
        >
          {channelDetail?.brandingSettings?.channel?.description}
        </Typography>
      </Box>
      <Box className="d-flex align-items-center justify-content-center p-3">
        <Videos videos={channelVideos} nochannel="true" />
      </Box>
    </>
  );
};

export default ChannelDetail;
