import logo from "/assets/images/logo.jpg";
import { Link, Navigate } from "react-router-dom";
import {
  Searchbar,
  NewReleasesIcon,
  HelpOutlineIcon,
  NotificationsIcon,
  AccountCircleIcon,
  MenuIcon,
  CloseIcon,
  ExpandMoreIcon,
} from "./index";
import {
  IconButton,
  Stack,
  Box,
  Grow,
  Typography,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useDispatch, useSelector } from "react-redux";
import { searchbarToggle } from "../features/Searchbar/searchbarSlice";
import { setCategory } from "../features/Category/categorySlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const [modalManager, setModalManager] = useState({
    helpModal: false,
    notifyModal: false,
    profileModal: false,
  });
  // const { sidebar, setSidebar } = useContext(CreateContext);

  function showModal(modalName) {
    setModalManager((prev) => ({
      [modalName]: !prev[modalName],
    }));
  }

  function resetState() {
    dispatch(setCategory(state.category.initialState));
  }

  // function toggleSidebar() {
  //   setSidebar(!sidebar);
  // }
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    color: "white",
    bgcolor: "#1E1E1E",
    p: 4,
    borderRadius: "20px",
  };
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
  const replaceUrl = (url) => {
    Navigate(url, { replace: true });
  };
  const searchbar = useSelector((state) => state.searchbar);
  return (
    <Stack
      className="px-1 py-2 px-md-3 py-md-2"
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
          // onClick={resetState}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grow in={true}>
            <img className="logoImg" src={logo} alt="logo" />
          </Grow>
          <IconButton className="text-white d-none">
            <MenuIcon />
          </IconButton>
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
          className="d-flex align-items-center justify-content-end gap-0 gap-md-3"
        >
          <Grow in={true}>
            <IconButton className="text-white" onClick={toggleSearch}>
              <Search />
            </IconButton>
          </Grow>
          <Grow in={true}>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("helpModal");
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Grow>

          <Grow in={true}>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("notifyModal");
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Grow>
          <Grow in={true}>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("profileModal");
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Grow>
        </Stack>
      </Box>
      <Modal
        open={modalManager.helpModal}
        onClose={() => {
          showModal("helpModal");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          variants={containerVariants}
          className="position-fixed"
          style={{ inset: 0 }}
        >
          <Box sx={style} className="modalWrapper">
            <Box
              className="closeButton"
              onClick={() => {
                showModal("helpModal");
              }}
            >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: "15px" }}
            >
              Help&nbsp;
              <HelpOutlineIcon />
            </Typography>
            <Accordion className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  I can&apos;t find the link to Github Repository
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  This Project is Closed Source due to its vast nature, and
                  complex api usage. This project not only incorporates UI built
                  through React, but also widely uses other libraries like
                  Material UI, Bootstrap, Framer Motion, Redux for state
                  management etc. as well
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>What is this YouTube clone </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  This YouTube clone is a web application built with React that
                  mimics the core functionalities of YouTube. It includes
                  features like video playback, search functionality, dynamic
                  content updates, comments, and more, all styled using Material
                  UI (MUI) and Bootstrap. The app is hosted on Vercel, offering
                  fast and reliable performance.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  What technologies are used in building this YouTube clone?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  This app uses the following technologies:
                  <br />
                  <ol>
                    <li>React Router DOM for routing and navigation.</li>
                    <li>
                      Material UI (MUI) and Bootstrap for the user interface
                      components and styling.
                    </li>
                    <li>YouTube API for fetching videos and related data. </li>
                    <li>Vercel for hosting the app.</li>
                  </ol>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  Does the app have a mobile-friendly design?
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  Yes, the app is fully responsive, utilizing Material UI and
                  Bootstrap to ensure that it works well on all screen sizes,
                  including mobile devices and tablets. The user interface
                  adapts dynamically to provide a smooth experience on any
                  device.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>How do I report bugs or issues?</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  To report bugs or issues, please reach out me at
                  gpsingh02414@gmail.com
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded className="accordionHeader">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>Hire Me</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="accordionPara">
                <Typography>
                  You can reach out to me via multiple platforms -
                  <br />
                  <Box>
                    Email:&nbsp;
                    <a
                      href="mailto:gpsingh02414@gmail.com"
                      className="text-white"
                      target="_blank"
                    >
                      gpsingh02414@gmail.com
                    </a>
                  </Box>
                  <Box>
                    LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/in/gurpreetchadhaeee/"
                      className="text-white"
                      target="_blank"
                    >
                      https://www.linkedin.com/in/gurpreetchadhaeee/
                    </a>
                  </Box>
                  <Box>
                    {" "}
                    Github:{" "}
                    <a
                      href="https://github.com/GurpreetSingh-Projects"
                      className="text-white"
                      target="_blank"
                    >
                      https://github.com/GurpreetSingh-Projects
                    </a>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </motion.div>
      </Modal>
      <Modal
        open={modalManager.notifyModal}
        onClose={() => {
          showModal("notifyModal");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          variants={containerVariants}
          className="position-fixed"
          style={{ inset: 0 }}
        >
          <Box sx={style} className="modalWrapper">
            <Box
              className="closeButton"
              onClick={() => {
                showModal("notifyModal");
              }}
            >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Recent Notifications&nbsp; <NotificationsIcon />
            </Typography>
            <Box
              id="modal-modal-description"
              className="notificationContainer"
              sx={{ mt: 2 }}
            >
              <Link to={`/video/Xj0Jtjg3lHQ`}>
                <Box
                  className="notificationItem1"
                  onClick={() => {
                    showModal("notifyModal");
                  }}
                >
                  <Box className="d-flex align-items-center justify-content-start gap-3 col-9">
                    <Avatar src="https://yt3.googleusercontent.com/fxGKYucJAVme-Yz4fsdCroCFCrANWqw0ql4GYuvx8Uq4l_euNJHgE-w9MTkLQA805vWCi-kE0g=s160-c-k-c0x00ffffff-no-rj"></Avatar>
                    <Box>
                      Don&apos;t miss this exciting new upload from{" "}
                      <b>Mr Beast </b>
                    </Box>
                  </Box>
                  <Box className="d-flex justify-content-end col-3 imgContainer">
                    <img
                      src="https://i.ytimg.com/vi/Xj0Jtjg3lHQ/mqdefault.jpg"
                      alt=""
                    />
                  </Box>
                  <Box
                    className="text-white position-absolute"
                    sx={{ top: "-10px", right: "-15px" }}
                  >
                    <NewReleasesIcon />
                  </Box>
                </Box>
              </Link>
            </Box>
            <Box
              id="modal-modal-description"
              className="notificationContainer"
              sx={{ mt: 2 }}
            >
              <Link to={`/video/P23iAJTT4HI`}>
                <Box
                  className="notificationItem"
                  onClick={() => {
                    showModal("notifyModal");
                  }}
                >
                  <Box className="d-flex align-items-center justify-content-start gap-3 col-9">
                    <Avatar src="https://yt3.googleusercontent.com/rrMcZWXHcMJ-GikSl3uEmB2gwu9uWg4gbgvI4_tFcNEkc5ys2emF0Oz6733mDVdaxz2jQ07xzQ=s160-c-k-c0x00ffffff-no-rj"></Avatar>
                    <Box>
                      Don't miss this exciting new upload from{" "}
                      <b>5-Minute Crafts</b>
                    </Box>
                  </Box>
                  <Box className="d-flex justify-content-end col-3 imgContainer">
                    <img
                      src="https://i.ytimg.com/vi/P23iAJTT4HI/mqdefault.jpg"
                      alt="Video Thumbnail"
                    />
                  </Box>
                  <Box
                    className="text-white position-absolute"
                    sx={{ top: "-10px", right: "-15px" }}
                  >
                    <NewReleasesIcon />
                  </Box>
                </Box>
              </Link>
            </Box>
            <Box
              id="modal-modal-description"
              className="notificationContainer"
              sx={{ mt: 2 }}
            >
              <Link to={`/video/71jBX5N3wcM`}>
                <Box
                  className="notificationItem"
                  onClick={() => {
                    showModal("notifyModal");
                  }}
                >
                  <Box className="d-flex align-items-center justify-content-start gap-3 col-9">
                    <Avatar src="https://yt3.ggpht.com/Vy6KL7EM_apxPSxF0pPy5w_c87YDTOlBQo3MADDF0Wl51kwxmt9wmRotnt2xQXwlrcyO0Xe56w=s48-c-k-c0x00ffffff-no-rj"></Avatar>
                    <Box>
                      Don't miss this exciting new upload from{" "}
                      <b>Linus Tech Tips</b>
                    </Box>
                  </Box>
                  <Box className="d-flex justify-content-end col-3 imgContainer">
                    <img
                      src="https://i.ytimg.com/vi/71jBX5N3wcM/mqdefault.jpg"
                      alt="Video Thumbnail"
                    />
                  </Box>
                  <Box
                    className="text-white position-absolute"
                    sx={{ top: "-10px", right: "-15px" }}
                  >
                    <NewReleasesIcon />
                  </Box>
                </Box>
              </Link>
            </Box>
            <Box
              id="modal-modal-description"
              className="notificationContainer"
              sx={{ mt: 2 }}
            >
              <Link to={`/video/N2JQ3b5sSMM`}>
                <Box
                  className="notificationItem"
                  onClick={() => {
                    showModal("notifyModal");
                  }}
                >
                  <Box className="d-flex align-items-center justify-content-start gap-3 col-9">
                    <Avatar src="https://yt3.ggpht.com/jpY2026WmAqmhk4EfjvaVb1yCN5StBl_TZ0hY-nlTP7z4F1bSo3tfvMwTLLMCtJwKhKU6e5hEg=s88-c-k-c0x00ffffff-no-rj"></Avatar>
                    <Box>
                      Don't miss this exciting new upload from <b>Pewdipie</b>
                    </Box>
                  </Box>
                  <Box className="d-flex justify-content-end col-3 imgContainer">
                    <img
                      src="https://i.ytimg.com/vi/N2JQ3b5sSMM/mqdefault.jpg"
                      alt="Video Thumbnail"
                    />
                  </Box>
                  <Box
                    className="text-white position-absolute"
                    sx={{ top: "-10px", right: "-15px" }}
                  >
                    <NewReleasesIcon />
                  </Box>
                </Box>
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Modal>
      <Modal
        open={modalManager.profileModal}
        onClose={() => {
          showModal("profileModal");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          variants={containerVariants}
          className="position-fixed"
          style={{ inset: 0 }}
        >
          <Box sx={style} className="modalWrapper profileModal">
            <Box
              className="closeButton"
              onClick={() => {
                showModal("profileModal");
              }}
            >
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile
            </Typography>
            <Box className="faj flex-column my-3">
              <Avatar sx={{ height: 120, width: 120 }}>G</Avatar>
              <Typography
                id="modal-modal-description"
                className="text-center"
                sx={{ mt: 2 }}
              >
                Welcome Guest User!! <br />
                The breeze is cold out there, stay cozy & warm ☕
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Modal>
    </Stack>
  );
};

export default Navbar;
