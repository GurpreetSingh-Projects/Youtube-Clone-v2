import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
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
import {
  Footer,
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components/index";
import { AppDispatch, RootState } from "./app/store";

export const App: React.FC = () => {
  //Tracking ID Needed for Google Analytics
  const TRACKING_ID: string = "G-XPVYS3W9Z2";

  //Get Selected Category for Currently active category from redux store
  const category: string = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const dispatch = useDispatch<AppDispatch>();

  const { data: getVideos } = useGetVideosQuery(category as string, {
    skip: !category,
    keepUnusedDataFor: 3600 * 24,
  });
  let getRecVids = useSelector((state) => state?.videos?.recommendVideos);
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
      </BrowserRouter>
    </>
  );
};
