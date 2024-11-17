import { Paper, IconButton, Box, Grow } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchbarToggle } from "../features/Searchbar/searchbarSlice";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleSearch();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  function toggleSearch() {
    dispatch(searchbarToggle());
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
          className="search-bar col-9 col-md-10"
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
