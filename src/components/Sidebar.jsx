import { Skeleton, Stack } from "@mui/material";
import { Category } from "@mui/icons-material";
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

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 0, name: "New", icon: <HomeIcon /> },
    { id: 1, name: "Daily Dose of Internet", icon: <SlideshowIcon /> },
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
  return (
    <div className="sidebar">
      <ul className="d-flex flex-col flex-wrap categoryBar ps-0">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.name);
            }}
            className="category-btn hvr-sweep-to-right"
            style={{
              background: category.name === selectedCategory && "#FC1503",
            }}
          >
            <span
              style={{
                marginRight: "10px",
              }}
            >
              {category.icon}
            </span>
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
