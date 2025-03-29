import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./index";
import { useSelector } from "react-redux";
const Feed = () => {
  const category = useSelector((state) => state.category.selectedCategory);
  return (
    <>
      <Stack
        sx={{ flexDirection: { sx: "column", md: "row", height: "100%" } }}
      >
        <Box
          sx={{
            height: { sx: "auto", md: "100%", overflow: "hidden" },
            px: {
              sx: 0,
              md: 2,
            },
          }}
        >
          <Sidebar />
        </Box>
        <Box
          className="containerNew"
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
            className="categoryName"
            sx={{ color: "white" }}
          >
            {category}&nbsp;
            <span style={{ color: "#f31503" }}>Category</span>
          </Typography>
          <Sidebar class="sidebarTopModification" reverse />

          <Videos />

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
