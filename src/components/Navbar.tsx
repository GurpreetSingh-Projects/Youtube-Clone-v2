import { Link, Navigate } from "react-router-dom";
import {
  Searchbar,
  NewReleasesIcon,
  HelpOutlineIcon,
  NotificationsIcon,
  AccountCircleIcon,
  MenuIcon,
  CloseIcon,
  SearchRecommendations,
  HelpModal,
  ProfileModal,
} from "./index";
import {
  IconButton,
  Stack,
  Box,
  Typography,
  Modal,
  Avatar,
  BoxProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { searchbarToggle } from "../features/Searchbar/searchbarSlice";
import { setCategory } from "../features/Category/categorySlice";
import { CSSProperties, Suspense, useState } from "react";
import { ModalProps, ShowModalProps } from "../utils/types";
import { words } from "../utils/constants";
import Welcome from "./Welcome";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const [modalManager, setModalManager] = useState<ModalProps>({
    helpModal: false,
    notifyModal: false,
    profileModal: false,
  });

  function showModal(modalName: ShowModalProps["modalName"]): void {
    setModalManager((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  }

  const style: CSSProperties | any = {
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
  const style2: CSSProperties | any = {
    position: "sticky",
    top: 0,
    justifyContent: "space-between",
    zIndex: 9999,
    background: "inherit",
  };
  const containerVariants: Variants = {
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
  const riseUp: Variants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      y: -100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        duration: 2.5,
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      y: -100,
    },
  };
  const AnimatedLogo = motion<BoxProps>(Box);

  function toggleSearch() {
    dispatch(searchbarToggle());
  }

  const searchbar: boolean = useSelector((state) => state.searchbar);
  return (
    <Stack
      className="px-1 py-2 px-md-3 py-md-2"
      direction="row"
      alignItems="center"
      sx={style2}
    >
      <Box
        className="col-3"
        onClick={() => {
          dispatch(setCategory("New"));
        }}
      >
        <Link
          to="/"
          className="d-flex align-items-center justify-between"
          style={{ display: "flex", alignItems: "center" }}
        >
          <AnimatedLogo
            // variants={riseUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img className="logoImg" src="/assets/images/logo.jpg" alt="logo" />
          </AnimatedLogo>
          <IconButton className="text-white d-none">
            <MenuIcon />
          </IconButton>
        </Link>
      </Box>
      <div className="col-6 d-flex">
        {!searchbar && (
          <>
            <div className="col-5 text-white fs-6 fst-italic d-none d-md-block text-end">
              Search for&nbsp;
            </div>
            <div className="col-7 text-white fs-6 fst-italic d-none d-md-block">
              &quot;
              <span className="searchTypewriter" onClick={toggleSearch}>
                <SearchRecommendations words={words} />
              </span>
              &quot;
            </div>
          </>
        )}
        {searchbar && (
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="position-fixed"
              style={{ inset: 0 }}
            >
              <div className="searchbarBox" onClick={toggleSearch} />
              <Suspense fallback={<></>}>
                <Searchbar />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Box className="col-3">
        <Stack
          direction="row"
          className="d-flex align-items-center justify-content-end gap-0 gap-md-2"
        >
          <Box>
            <IconButton className="text-white" onClick={toggleSearch}>
              <Search />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("helpModal");
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Box>

          <Box>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("notifyModal");
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              className="text-white"
              onClick={() => {
                showModal("profileModal");
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
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
          as
          CSSProperties
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
            <HelpModal />
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
                    <Avatar src="assets/images/mb.webp"></Avatar>
                    <Box>
                      Don&apos;t miss this exciting new upload from&nbsp;
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
                    <Avatar src="assets/images/5m.webp"></Avatar>
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
                    <Avatar src="assets/images/ltt.webp"></Avatar>
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
                    <Avatar src="assets/images/pp.webp"></Avatar>
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
            <ProfileModal />
          </Box>
        </motion.div>
      </Modal>
    </Stack>
  );
};

export default Navbar;
