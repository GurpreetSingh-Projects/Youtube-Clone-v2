import { Box, Typography } from "@mui/material";
import { Videos } from "./index";
import { fetchApi } from "../utils/fetchApi";
import { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateContext } from "../App";
export const SearchContext = createContext();

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const { setVideos } = useContext(CreateContext);
  useEffect(() => {
    fetchApi(`search?part=snippet&q=${searchTerm}`).then((res) => {
      setVideos(res.items);
    });
  }, [searchTerm]);

  return (
    <>
      <Box sx={{ display: "flex", flex: "column" }}>
        {/* <Box
          sx={{
            borderRight: "1px solid #3d3d3d",
            display: { sm: "none", md: "block" },
          }}
        >
          <Sidebar />
          <Typography
            className="copyright"
            variant="body2"
            sx={{ mt: 1.5, color: "white" }}
          >
            Copyright @GurpreetSingh-Projects
          </Typography>
        </Box> */}
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
