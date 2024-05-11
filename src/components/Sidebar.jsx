import { Stack } from "@mui/material";
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

export const categories = [
  { id: 1, name: "New", icon: <HomeIcon /> },
  { id: 2, name: "JS Mastery", icon: <CodeIcon /> },
  { id: 3, name: "Coding", icon: <CodeIcon /> },
  { id: 4, name: "ReactJS", icon: <CodeIcon /> },
  { id: 5, name: "NextJS", icon: <CodeIcon /> },
  { id: 6, name: "Music", icon: <MusicNoteIcon /> },
  { id: 7, name: "Education", icon: <SchoolIcon /> },
  { id: 8, name: "Podcast", icon: <GraphicEqIcon /> },
  { id: 9, name: "Movie", icon: <OndemandVideoIcon /> },
  { id: 10, name: "Gaming", icon: <SportsEsportsIcon /> },
  { id: 11, name: "Live", icon: <LiveTvIcon /> },
  { id: 12, name: "Sport", icon: <FitnessCenterIcon /> },
  { id: 13, name: "Fashion", icon: <CheckroomIcon /> },
  { id: 14, name: "Beauty", icon: <FaceRetouchingNaturalIcon /> },
  { id: 15, name: "Comedy", icon: <TheaterComedyIcon /> },
  { id: 16, name: "Gym", icon: <FitnessCenterIcon /> },
  { id: 17, name: "Crypto", icon: <DeveloperModeIcon /> },
];
const selectedCategory = "New";
const Sidebar = () => {
  return (
    <div>
      <Stack
        sx={{
          overflowY: "auto",
          height: { sx: "auto", md: "95%" },
          flexDirection: { md: "column" },
        }}/
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-btn"
            style={{
              background: category.name === selectedCategory && "FC1503",
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </Stack>
    </div>
  );
};

export default Sidebar;
