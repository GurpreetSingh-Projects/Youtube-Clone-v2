import logo from "/assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { Searchbar } from "./index";
import { useContext, useEffect, useState } from "react";
import { CreateContext } from "../App";
import { Paper, IconButton, Stack, Zoom, Grow, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, Search } from "@mui/icons-material";
const Navbar = () => {
  const { setSelectedCategory, sidebar, setSidebar } =
    useContext(CreateContext);
  function resetState() {
    setSelectedCategory("New");
  }
  function toggleSidebar() {
    setSidebar(!sidebar);
  }
  return (
    <Stack
      className="px-3 py-2"
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        zIndex: "9999",
        background: "inherit",
      }}
    >
      <Box className="col-4">
        <Link
          to="/"
          className="d-flex align-items-center justify-between"
          onClick={resetState}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grow in={true} style={{ transitionDelay: "1500ms" }}>
            <img className="logoImg animate__bounce" src={logo} alt="logo" />
          </Grow>
        </Link>
      </Box>
      <Box className="col-4">
        <Searchbar />
      </Box>
      <Box className="col-4">
        <Stack
          className="col-0 d-flex align-items-center justify-content-end"
          direction="row"
        >
          <Grow in={true} style={{ transitionDelay: "1500ms" }}>
            <Box className="d-flex align-items-center gap-3">
              <IconButton className="text-white">
                <HelpOutlineIcon />
              </IconButton>
              <IconButton className="text-white">
                <NotificationsIcon />
              </IconButton>

              <IconButton className="text-white">
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Grow>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Navbar;
