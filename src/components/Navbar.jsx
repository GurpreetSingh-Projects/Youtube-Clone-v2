import logo from "/assets/images/logo.png";
import { Link } from "react-router-dom";
import { Searchbar } from "./index";
import { useContext, useEffect } from "react";
import { CreateContext } from "../App";
import { Paper, IconButton, Stack, Zoom, Grow } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Search } from "@mui/icons-material";
const Navbar = () => {
  const { setSelectedCategory } = useContext(CreateContext);
  function resetState() {
    setSelectedCategory("New");
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
      <Link
        to="/"
        className="col-4"
        onClick={resetState}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grow in={true} style={{ transitionDelay: "1500ms" }}>
          <img className="logoImg" src={logo} alt="logo" />
        </Grow>
      </Link>
      <Searchbar />

      <Stack
        className="gap-3 col-4 d-flex align-items-center justify-content-end"
        direction="row"
      >
        <Grow in={true} style={{ transitionDelay: "1500ms" }}>
          <IconButton className="text-white">
            <HelpOutlineIcon />
          </IconButton>
        </Grow>
        <Grow in={true} style={{ transitionDelay: "1500ms" }}>
          <IconButton className="text-white">
            <NotificationsIcon />
          </IconButton>
        </Grow>
        <Grow in={true} style={{ transitionDelay: "1500ms" }}>
          <IconButton className="text-white">
            <AccountCircleIcon />
          </IconButton>
        </Grow>
      </Stack>
    </Stack>
  );
};

export default Navbar;
