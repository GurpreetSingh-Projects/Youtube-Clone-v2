import { Box, Stack, Typography } from "@mui/material";
import { SearchFeed, Searchbar, Sidebar, VideoDetail, Videos } from "./index";
import { fetchApi } from "../utils/fetchApi";
import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
// import VidSkeleton from "./VidSkeleton";
import { CreateContext } from "../App";
// const VidComponent = lazy(() => import("../components/Videos"));
const Feed = () => {
  var { selectedCategory, setSelectedCategory } = useContext(CreateContext);

  return (
    <>
      <Stack
        sx={{ flexDirection: { sx: "column", md: "row", height: "100%" } }}
      >
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
        </Box>
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            height: "88vh",
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

          {/* <Suspense fallback={<VidSkeleton />}> */}
          {/* <VidComponent /> */}
          {/* </Suspense> */}
          <Videos />

          {/* Loader */}

          {/* <Box className="w-100 d-flex justify-content-center">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Box> */}
        </Box>
      </Stack>
    </>
  );
};

export default Feed;
