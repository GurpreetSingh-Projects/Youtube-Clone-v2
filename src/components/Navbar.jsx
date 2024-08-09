import { Stack } from "@mui/material";
import logo from "/assets/images/logo.png";
import { Link } from "react-router-dom";
import { Searchbar } from "./index";

const Navbar = () => (
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
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img className="logoImg" src={logo} alt="logo" />
    </Link>
    <Searchbar />
  </Stack>
);

export default Navbar;
