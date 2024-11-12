import { Box, Typography } from "@mui/material";
import { Videos } from "./index";
import { fetchApi } from "../utils/fetchApi";
import { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateContext } from "../App";
import { useDispatch } from "react-redux";
import { setVideos } from "../features/Videos/videoSlice";
export const SearchContext = createContext();

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchApi(`search?part=snippet&q=${searchTerm}`).then((res) => {
      dispatch(setVideos(res.items));
    });
  }, [searchTerm]);

  return (
    <>
      <Box sx={{ display: "flex", flex: "column" }}>
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white", fontSize: "16px" }}
          >
            Showing Search results for&nbsp;
            <span style={{ color: "#f31503" }}>{searchTerm}</span>
          </Typography>
          <Videos />
        </Box>
      </Box>
    </>
  );
};

export default SearchFeed;
