import { Box, Stack, Typography } from "@mui/material";
import { SearchFeed, Searchbar, Sidebar } from "./index";
import { fetchApi } from "../utils/fetchApi";
import React, { Suspense, lazy, useEffect, useState } from "react";
import VidSkeleton from "./VidSkeleton";
const VidComponent = lazy(() => import("../components/Videos"));
const Feed = () => {
  console.log("Hi, Feed here :)");
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchApi(`search?part=snippet&q=${selectedCategory}`).then((res) => {
      setVideos(res.items);
    });
  }, [selectedCategory]);

  return (
    <>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box
          sx={{
            height: { sx: "auto", md: "100%", overflow: "hidden" },
            // borderRight: "1px solid #3d3d3d",
            px: {
              sx: 0,
              md: 2,
            },
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Typography
            className="copyright"
            variant="body2"
            sx={{ mt: 1.5, color: "white" }}
          >
            Copyright @GurpreetSingh-Projects
          </Typography>
        </Box>
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            height: "90vh",
            width: "100%",
            flex: 2,
            background: "#ffffff1a",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
          </Typography>

          <Suspense fallback={<VidSkeleton />}>
            <VidComponent videos={videos} />
          </Suspense>
        </Box>
      </Stack>
    </>
  );
};

export default Feed;
