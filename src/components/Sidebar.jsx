import { Skeleton, Stack } from "@mui/material";
import { Category, Translate, Whatshot } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CodeIcon from "@mui/icons-material/Code";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SchoolIcon from "@mui/icons-material/School";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { useContext } from "react";
import { CreateContext } from "../App";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/Category/categorySlice";
const Sidebar = () => {
  const { sidebar } = useContext(CreateContext);
  const categories = [
    { id: 0, name: "Latest Topics", icon: <Whatshot /> },
    { id: 1, name: "New", icon: <HomeIcon /> },
    { id: 2, name: "Coding", icon: <CodeIcon /> },
    { id: 3, name: "ReactJS", icon: <CodeIcon /> },
    { id: 4, name: "NextJS", icon: <CodeIcon /> },
    { id: 5, name: "Music", icon: <MusicNoteIcon /> },
    { id: 6, name: "Education", icon: <SchoolIcon /> },
    { id: 7, name: "Podcast", icon: <GraphicEqIcon /> },
    { id: 8, name: "Movie", icon: <OndemandVideoIcon /> },
    { id: 9, name: "Gaming", icon: <SportsEsportsIcon /> },
    { id: 10, name: "Live", icon: <LiveTvIcon /> },
    { id: 11, name: "Sport", icon: <FitnessCenterIcon /> },
    { id: 12, name: "Fashion", icon: <CheckroomIcon /> },
    { id: 13, name: "Beauty", icon: <FaceRetouchingNaturalIcon /> },
    { id: 14, name: "Comedy", icon: <TheaterComedyIcon /> },
    { id: 15, name: "Gym", icon: <FitnessCenterIcon /> },
    { id: 16, name: "Crypto", icon: <DeveloperModeIcon /> },
  ];
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 1, x: -250 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.01,
      },
    },
  };
  function changeCategory(category) {
    dispatch(setCategory(category));
  }
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  return sidebar ? (
    <div className="sidebar">
      <motion.ul
        className="d-flex flex-col flex-md-wrap categoryBar ps-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {categories.map((category) => (
          <motion.li
            key={category.id}
            onClick={() => {
              changeCategory(category.name);
            }}
            variants={itemVariants}
            className="category-btn hvr-sweep-to-right d-flex align-items-center"
            style={{
              background: category.name === activeCategory && "#FC1503",
              translate: category.name === activeCategory && "5px 0px",
            }}
          >
            <span
              style={{
                marginRight: "10px",
              }}
            >
              {category.icon}
            </span>
            <span className="text-nowrap">{category.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  ) : (
    <></>
  );
};

export default Sidebar;
