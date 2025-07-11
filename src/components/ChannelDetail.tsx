// import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { fetchApi } from "../utils/fetchApi";
import { Box, Card, Hidden, Typography } from "@mui/material";
import { ChannelCard, Videos } from "./index";
// import { CreateContext } from "../App";
import {
  useGetChannelPlaylistIdQuery,
  useGetChannelPlaylistItemsQuery,
  useGetVidDetailsQuery,
} from "../features/FetchApi/fetchapi";
import { useEffect, useState } from "react";
// import { fetchApi } from "../utils/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { setRecommendedVideos, setVideos } from "../features/Videos/videoSlice";
import { setChannelIds } from "../features/ChannelIds/channelidsSlice";
import SubscribeButton from "./SubscribeButton";
import { extendDescription } from "../utils/constants";
import {
  setChannelId,
  setPlaylist,
  setPlaylistId,
} from "../features/CurrChannel/currChannelSlice";

const ChannelDetail = () => {
  const [channelDetails, setChannelDetails] = useState("");
  const [channelPlaylistId, setChannelPlaylistId] = useState("");
  const [renderVid, setRenderVid] = useState(false);
  const dispatch = useDispatch();

  const id = useSelector((state) => state.currChannel.channelId);
  const { data: getChannelPlaylistId } = useGetChannelPlaylistIdQuery(id, {
    skip: !id,
    keepUnusedDataFor: 3600 * 24,
  });
  useEffect(() => {
    if (getChannelPlaylistId != "") {
      dispatch(setPlaylistId(getChannelPlaylistId?.items[0]));
      setChannelDetails(getChannelPlaylistId?.items[0]);
      setChannelPlaylistId(
        getChannelPlaylistId?.items[0]?.contentDetails?.relatedPlaylists
          ?.uploads
      );
    }
  }, [getChannelPlaylistId]);
  const { data: getChannelPlaylistItems } = useGetChannelPlaylistItemsQuery(
    channelPlaylistId || null,
    {
      skip: !channelPlaylistId,
      keepUnusedDataFor: 3600 * 24,
    }
  );
  useEffect(() => {
    if (getChannelPlaylistItems != "") {
      dispatch(setPlaylist(getChannelPlaylistItems));
      dispatch(setRecommendedVideos(getChannelPlaylistItems));
      setRenderVid(true);
    } else {
      dispatch(setRecommendedVideos([]));
    }
  }, [getChannelPlaylistItems]);

  return (
    <>
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
          src={channelDetails?.brandingSettings?.image?.bannerExternalUrl}
          style={{ width: "100%" }}
          alt=""
        />
      </Box>

      <ChannelCard
        channelDetail={channelDetails}
        marginTop="-100px"
      ></ChannelCard>

      <Box className="faj flex-column mt-0">
        <Typography
          id="vidDescription"
          onClick={extendDescription}
          style={{
            fontSize: "15px",
            color: "white",
            textAlign: "center",
            margin: "20px",
            marginTop: { lg: "-50px", sm: "-50px" },
            maxWidth: "75vw",
            textWrap: "wrap",
            textOverflow: "ellipsis",
          }}
        >
          {channelDetails?.brandingSettings?.channel?.description}
        </Typography>
        <Box className="faj">
          <SubscribeButton marginStart="ms-0" />
        </Box>
      </Box>
      {renderVid && (
        <Box className="justify-content-center p-3">
          <Videos channelView={true} />
        </Box>
      )}
    </>
  );
};

export default ChannelDetail;
