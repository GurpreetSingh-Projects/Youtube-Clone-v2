// src/App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ReactGA from "react-ga4";
export default function App() {
  const TRACKING_ID = "G-XPVYS3W9Z2";
  const category = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const { data: getVideos } = useGetVideosQuery(category, {
    skip: !category,
    keepUnusedDataFor: 3600 * 24,
  });
  let getRecVids = useSelector((state) => state?.videos?.recommendVideos);
  // console.log(getRecVids);
  // let getChannelVids = useSelector((state) => state.videos.recommendedVideos);
  useEffect(() => {
    if (getVideos != null) {
      dispatch(searchResults(getVideos));
      var videoIdsString = "";
      getVideos?.items.map((items) => {
        videoIdsString += items?.id?.videoId + ",";
      });
      if (!getRecVids) {
        getRecVids?.items.map((items) => {
          videoIdsString += items?.id?.videoId + ",";
        });
      }

      videoIdsString = videoIdsString.substring(0, videoIdsString.length - 1);
      dispatch(setVidIds(videoIdsString));
    }
  }, [getVideos, getRecVids, category]);

  var vidIds = useSelector((state) => state.vidIds);
  const { data: getVidDetails } = useGetVidDetailsQuery(vidIds.vidIds || null, {
    skip: vidIds.vidIds.length == 0,
    keepUnusedDataFor: 3600 * 24,
  });
  useEffect(() => {
    if (vidIds.vidIds.length > 0 && getVidDetails) {
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
  const { data: getChannelDetails } = useGetChannelDetailsQuery(
    channelIdsString || null,
    {
      skip: !channelIdsString,
      keepUnusedDataFor: 24 * 3600,
    }
  );
  useEffect(() => {
    if (getChannelDetails) {
      dispatch(setChannels(getChannelDetails));
    }
  }, [getChannelDetails, dispatch]);
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);
  useEffect(() => {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);
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
