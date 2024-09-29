import { Stack } from "@mui/material";
import logo from "/assets/images/logo.png";
import { Link } from "react-router-dom";
import { Searchbar } from "./index";
import { useContext, useEffect } from "react";
import { CreateContext } from "../App";

const Navbar = () => {
  const { setSelectedCategory } = useContext(CreateContext);

  function resetState() {
    setSelectedCategory("New");
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
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
        onClick={resetState}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img className="logoImg" src={logo} alt="logo" />
      </Link>
      <Searchbar />
    </Stack>
  );
};

export default Navbar;
