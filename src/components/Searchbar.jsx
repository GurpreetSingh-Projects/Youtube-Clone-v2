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
    <Grow in={1}>
      <Stack
        direction="row"
        className="col-4 d-flex ms-3 justify-content-center"
      >
        <Paper
          id="searchBarContainer"
          className="w-100 animate__flash py-0"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            boxShadow: "none",
            display: "flex",
            mr: { sm: 5 },
            width: { md: "30%", sm: "50%" },
            transform: "scale(0.9)",
          }}
        >
          <input
            className=" search-bar"
            style={{ background: "transparent" }}
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <IconButton
            className="d-flex"
            type="submit"
            sx={{ p: "10px", color: "red" }}
          >
            <Search />
          </IconButton>
        </Paper>
      </Stack>
    </Grow>
  );
}
