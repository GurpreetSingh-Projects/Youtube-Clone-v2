import logo from "/assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { Searchbar } from "./index";
import { useContext } from "react";
import { CreateContext } from "../App";
import { Paper, IconButton, Stack, Box, Grow } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Search } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import { searchbarToggle } from "../features/Searchbar/searchbarSlice";

const Navbar = () => {
  const searchbar = useSelector((state) => state.searchbar);

  console.log(searchbar);
  const dispatch = useDispatch();

  const { setSelectedCategory, sidebar, setSidebar } =
    useContext(CreateContext);

  function resetState() {
    setSelectedCategory("New");
  }

  function toggleSidebar() {
    setSidebar(!sidebar);
  }

  const containerVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      y: 500,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      y: 500,
    },
  };

  function toggleSearch() {
    dispatch(searchbarToggle());
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
        zIndex: 9999,
        background: "inherit",
      }}
    >
      <Box className="col-3">
        <Link
          to="/"
          className="d-flex align-items-center justify-between"
          onClick={resetState}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grow in={true}>
            <img className="logoImg" src={logo} alt="logo" />
          </Grow>
        </Link>
      </Box>
      <div className="col-6 d-flex">
        <div className="col-5 text-white fs-6 fst-italic d-none d-md-block text-end">
          Search for&nbsp;
        </div>
        <div className="col-7 text-white fs-6 fst-italic d-none d-md-block">
          &quot;
          <span>
            <Typewriter
              words={[
                "How to code a responsive website",
                "Top web development trends",
                "CSS animations tutorial for beginners",
                "JavaScript vs TypeScript: Which is better?",
                "Best practices for SEO in web design",
                "How to optimize website performance",
                "What's!",
                "Welcome to React!",
                "Enjoy coding!",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
          &quot;
        </div>
        <AnimatePresence>
          {searchbar && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }} // Adjust duration as needed
              variants={containerVariants}
              className="position-fixed"
              style={{ inset: 0 }}
            >
              <div className="searchbarBox" onClick={toggleSearch} />
              <Searchbar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Box className="col-3">
        <Stack
          direction="row"
          spacing={2} // Added spacing for better alignment
          className="d-flex align-items-center justify-content-end"
        >
          <Grow in={true}>
            <IconButton className="text-white" onClick={toggleSearch}>
              <Search />
            </IconButton>
          </Grow>
          <Grow in={true}>
            <IconButton className="text-white">
              <HelpOutlineIcon />
            </IconButton>
          </Grow>
          <Grow in={true}>
            <IconButton className="text-white">
              <NotificationsIcon />
            </IconButton>
          </Grow>
          <Grow in={true}>
            <IconButton className="text-white">
              <AccountCircleIcon />
            </IconButton>
          </Grow>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Navbar;
