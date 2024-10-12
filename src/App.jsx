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
import { createContext, useEffect, useState } from "react";
import { fetchApi } from "./utils/fetchApi";
export const CreateContext = createContext();

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchApi(`search?part=snippet&q=${selectedCategory}`).then((res) => {
      setVideos(res.items);
    });
  }, [selectedCategory]);

  return (
    <>
      <BrowserRouter>
        <CreateContext.Provider
          value={{ videos, setVideos, selectedCategory, setSelectedCategory }}
        >
          <Box
            m={0}
            pb={1}
            className="backgroundImg"
            // sx={{
            //   backgroundColor: "#333",
            // }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route exact path="/video/:id" element={<VideoDetail />} />
              <Route exact path="/channel/:id" element={<ChannelDetail />} />
              <Route
                exact
                path="/search/:searchTerm"
                element={<SearchFeed />}
              />
            </Routes>
            <Footer />
          </Box>
        </CreateContext.Provider>
      </BrowserRouter>
    </>
  );
}
