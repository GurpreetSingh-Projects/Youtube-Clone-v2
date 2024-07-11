import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import { Box, Card, Hidden } from "@mui/material";
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

    fetchApi(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      setChannelVideos(data?.items);
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
      <Box className="d-flex align-items-center justify-content-center p-3">
        <Videos videos={channelVideos} />
      </Box>
    </>
  );
};

export default ChannelDetail;
