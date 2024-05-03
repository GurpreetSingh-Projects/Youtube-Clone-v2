import { Stack } from "@mui/material";
import logo from "../../public/assets/images/logo.png";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{ position: "sticky", top: 0, justifyContent: "space-between" }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    <Searchbar />
  </Stack>
);

export default Navbar;
