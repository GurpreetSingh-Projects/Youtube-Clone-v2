// import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { fetchApi } from "../utils/fetchApi";
import { Box, Card, Hidden, Typography } from "@mui/material";
import { ChannelCard, Videos } from "./index";
// import { CreateContext } from "../App";
import { useGetVidDetailsQuery } from "../features/FetchApi/fetchapi";
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";
import { useDispatch } from "react-redux";
import { setVideos } from "../features/Videos/videoSlice";
import { setChannelIds } from "../features/ChannelIds/channelidsSlice";
import SubscribeButton from "./SubscribeButton";
import { extendDescription } from "../utils/constants";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [channelPlaylistId, setChannelPlaylistId] = useState("");
  var playListId = "";
  // const { setVideos } = useContext(CreateContext);

  const { id } = useParams();
  const dispatch = useDispatch;
  useEffect(() => {
    fetchApi(
      `channels?part=snippet%2Cstatistics%2CbrandingSettings&id=${id}`
    ).then((data) => {
      setChannelDetail(data?.items[0]);
    });

    fetchApi(`channels?part=contentDetails&id=${id}`).then((data) => {
      setChannelPlaylistId(
        data?.items[0]?.contentDetails?.relatedPlaylists?.uploads
      );
      playListId = data?.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    });

    // fetchApi(`search?part=snippet&channelId?=${id}&type=video`).then((data) => {
    //   // alert("videos-" + JSON.stringify(data));
    //   dispatch(setChannelIds(data));
    // });
  }, [id]);
  useEffect(() => {
    fetchApi(`playlistItems?part=snippet&id=${playListId}`).then((data) => {
      // alert(playListId);
      console.log(JSON.stringify(data));
    });
  }, [playListId]);

  // const { data: getChannelDetails } = useGetVidDetailsQuery(id);
  // console.log(JSON.stringify(getChannelDetails));

  return (
    <>
      <Box>
        <Box
          className="channelBanner"
          sx={{
            zIndex: "100",
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
        </Box>

        <ChannelCard
          channelDetail={channelDetail}
          marginTop="-100px"
        ></ChannelCard>
      </Box>
      <Box className="faj flex-column">
        <Typography
          id="vidDescription"
          onClick={extendDescription}
          style={{
            fontSize: "15px",
            color: "white",
            textAlign: "center",
            margin: "20px",
            marginTop: { lg: "-20px", sm: "-50px" },
            maxWidth: "75vw",
            textWrap: "wrap",
            textOverflow: "ellipsis",
          }}
        >
          {channelDetail?.brandingSettings?.channel?.description}
        </Typography>
        <Box className="faj">
          <SubscribeButton marginStart="ms-0" />
        </Box>
      </Box>

      <Box className="d-flex align-items-center justify-content-center p-3">
        <Videos />
      </Box>
    </>
  );
};

export default ChannelDetail;
