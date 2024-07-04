import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
const Searchbar = () => (
  <Paper
    component="form"
    onSubmit={(res) => {
      setVideo(res);
    }}
    sx={{
      borderRadius: 20,
      border: "1px solid #e3e3e3",
      pl: 2,
      boxShadow: "none",
      mr: { sm: 5 },
      width: "30%",
    }}
  >
    <input
      className="search-bar"
      style={{ width: "85%", background: "transparent" }}
      placeholder="Search..."
    />
    <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
      <Search />
    </IconButton>
  </Paper>
);

export default Searchbar;
