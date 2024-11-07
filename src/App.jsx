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
import { useSelector } from "react-redux";
export const CreateContext = createContext();

export default function App() {
  const [videos, setVideos] = useState([]);
  const [sidebar, setSidebar] = useState(true);
  const [currVid, setCurrVid] = useState("q4z7zpG9XA");
  const category = useSelector((state) => state.category.selectedCategory);
  console.log(category);

  useEffect(() => {
    fetchApi(`search?part=snippet&q=${category}`).then((res) => {
      setVideos(res.items);
    });
  }, [category]);

  return (
    <>
      {/* <Counter /> */}
      <BrowserRouter>
        <CreateContext.Provider
          value={{
            videos,
            setVideos,
            sidebar,
            setSidebar,
            currVid,
            setCurrVid,
          }}
        >
          <Box m={0} pb={1} className="backgroundImg">
            <Navbar />
            <Routes>
              <Route path="/" element={<Feed />} />
              {/* <Route path="/*" element={<Feed />} /> */}
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
