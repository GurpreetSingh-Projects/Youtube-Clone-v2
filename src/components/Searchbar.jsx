import { Paper, IconButton, Stack, Grow } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <Grow in={true}>
      <Stack
        direction="row"
        className="d-flex ms-3 justify-content-center"
      >
        <Paper
          id="searchBarContainer"
          className="w-100 animate__flash py-0 px-3 d-flex"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            boxShadow: "none",
            mr: { sm: 5 },
            transform: "scale(0.9)",
          }}
        >
          <input
            className="search-bar bg-transparent w-100"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
            <Search />
          </IconButton>
        </Paper>
      </Stack>
    </Grow>
  );
}
