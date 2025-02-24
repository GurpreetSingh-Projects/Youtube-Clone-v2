import { Paper, IconButton, Box, Grow, Typography } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchbarToggle } from "../features/Searchbar/searchbarSlice";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { animate, motion, stagger } from "framer-motion";
export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var searchTerms = [
    "AI music composition",
    "virtual concerts",
    "Spotify music algorithm",
    "React 19 RC",
    "MIDI controller review",
    "Tidal vs Spotify sound quality",
    "Art",
    "Top Cooking",
    "gaming music soundtrack",
    "Next js",
    "digital piano vs acoustic",
    "music production software",
    "News",
    "Photos App",
    "Portfolio",
    "sound design plugins",
    "music streaming platforms",
    "Trending",
    "Apple Music exclusive artists",
    "VR music performance",
  ];
  useMemo(() => {
    for (let i = 0; i < searchTerms.length; i++) {
      let temp = Math.random();
      temp = Math.ceil(temp * 10);
      if (temp < searchTerms.length) {
        let j = temp;
        searchTerms[temp] = searchTerms[i];
        searchTerms[i] = searchTerms[j];
      }
    }
  }, []);
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
  function setFormInput(item) {
    var searchTerm = (document.getElementsByClassName("search-bar")[0].value =
      item);

    if (searchTerm) {
      toggleSearch();
      navigate(`/search/${searchTerm}`);
    }
  }
  const slideUp = {
    hidden: { opacity: 0.5 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const searchItemVariants = {
    hidden: {
      opacity: 0.5,
      scale: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };
  return (
    <motion.div
      className="searchBarContainer"
      initial="hidden"
      animate="visible"
      variants={slideUp}
    >
      <motion.h4
        fontWeight="bold"
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: "900",
        }}
      >
        Search for your Favorite Topics...
      </motion.h4>
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
      <div className="searchSuggestions">
        <motion.div variants={slideUp} className="searchTermContainer">
          {searchTerms.map((item) => (
            <motion.div
              key={item}
              className="searchItem"
              onClick={() => setFormInput(item)}
              variants={searchItemVariants}
            >
              {item}&nbsp;
              <TrendingUpIcon />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
