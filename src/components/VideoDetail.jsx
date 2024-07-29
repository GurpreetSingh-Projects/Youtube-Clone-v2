import { Box } from "@mui/material";
import { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { fetchApi } from "../utils/fetchApi";
function VideoDetail() {
  const { id } = useParams();
  // const [currVid, setCurrVid] = useState("");
  // console.log(id);
  // useEffect(
  //   (e) => {
  //     fetchApi(
  //       `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`
  //     ).then((data) => {
  //       setCurrVid(data);
  //     });
  //   },
  //   [id]
  // );
  return (
    <Box sx={{ height: "95vh", background: "inherit" }}>
      <Box>
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${id}`}
          playing={true}
          muted
          controls
        />
      </Box>
    </Box>
  );
}

export default VideoDetail;
