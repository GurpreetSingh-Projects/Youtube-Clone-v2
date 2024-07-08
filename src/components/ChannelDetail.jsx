import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
import { Box, Card } from "@mui/material";
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
      <Box minHeight="95vh">
        <Box>
          <div style={{ background: "white", zIndex: 10, height: 200 }}></div>
        </Box>
        <ChannelCard
          channelDetail={channelDetail}
          marginTop="-100px"
        ></ChannelCard>
      </Box>
      <Box>
        <Videos videos={channelVideos} />
      </Box>
    </>
  );
};

export default ChannelDetail;
