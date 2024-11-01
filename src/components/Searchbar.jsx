import { Paper, IconButton, Box, Grow } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../App";

export default function Searchbar() {
  const { searchbar, setSearchbar } = useContext(CreateContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleSearch();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  function toggleSearch() {
    setSearchbar(!searchbar);
  }

  return (
    <form id="searchBarContainer" onSubmit={handleSubmit}>
      <div
        className="row d-flex flex-nowrap bg-white"
        style={{
          borderRadius: 99,
          border: "1px solid #e3e3e3",
        }}
      >
        <IconButton
          className="col-1"
          type="submit"
          sx={{ p: "10px", color: "red", width: "fit-content" }}
        >
          <Search />
        </IconButton>
        <input
          className="search-bar col-10"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          autoFocus
          required
        />
        <IconButton
          className="col-1"
          sx={{ p: "10px", color: "black", width: "fit-content" }}
          onClick={() => {
            toggleSearch();
          }}
        >
          <Close />
        </IconButton>
      </div>
    </form>
  );
}
