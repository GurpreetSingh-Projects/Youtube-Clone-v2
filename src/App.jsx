// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";

import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVidIds } from "./features/VidIds/vidIdsSlice";
import {
  useGetChannelDetailsQuery,
  useGetVidDetailsQuery,
  useGetVideosQuery,
} from "./features/FetchApi/fetchapi";
import { setVideos } from "./features/Videos/videoSlice";
import { searchResults } from "./features/Search/searchSlice";
import { setChannelIds } from "./features/ChannelIds/channelidsSlice";
import { setChannels } from "./features/Channels/channelsSlice";

export default function App() {
  // const [sidebar, setSidebar] = useState(true);
  // const [currVid, setCurrVid] = useState("default");

  const category = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const { data: getVideos } = useGetVideosQuery(category, {
    keepUnusedDataFor: 3600 * 24,
  });

  useEffect(() => {
    if (getVideos) {
      dispatch(searchResults(getVideos));

      var videoIdsString = "";

      getVideos.items.map((items) => {
        videoIdsString += items.id.videoId + ",";
      });
      videoIdsString = videoIdsString.substring(0, videoIdsString.length - 1);
      dispatch(setVidIds(videoIdsString));
    }
  }, [getVideos]);

  var vidIds = useSelector((state) => state.vidIds);

  const { data: getVidDetails } = useGetVidDetailsQuery(vidIds.vidIds, {
    keepUnusedDataFor: 3600 * 24,
  });
  useEffect(() => {
    if (vidIds.vidIds.length > 0 && getVidDetails) {
      // console.log("Video details -" + getVidDetails);
      dispatch(setVideos(getVidDetails));
    }
  }, [getVidDetails]);

  useEffect(() => {
    if (getVideos) {
      var channelIdsString = "";
      getVideos.items.map((item) => {
        channelIdsString += item.snippet.channelId + ",";
      });
      channelIdsString = channelIdsString.substring(
        0,
        channelIdsString.length - 1
      );
      // console.log(channelIdsString);
      dispatch(setChannelIds(channelIdsString));
    }
  }, [getVideos]);

  var channelIdsString = useSelector((state) => state.channelIds.channelIds);
  // channelIdsString = JSON.stringify(channelIdsString);

  const { data: getChannelDetails } = useGetChannelDetailsQuery(
    channelIdsString || null,
    { keepUnusedDataFor: 24 * 3600 }
  );
  useEffect(() => {
    if (getChannelDetails) {
      dispatch(setChannels(getChannelDetails));
    }
  }, [getChannelDetails, dispatch]);

  return (
    <>
      <BrowserRouter>
        {/* <CreateContext.Provider
          value={{
            sidebar,
            setSidebar,
            currVid,
            setCurrVid,
          }}
        > */}
        <Box className="backgroundImg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/*" element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
          <Footer />
        </Box>
        {/* </CreateContext.Provider> */}
      </BrowserRouter>
    </>
  );
}
