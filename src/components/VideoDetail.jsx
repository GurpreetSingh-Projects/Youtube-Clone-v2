import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, Link } from "react-router-dom";
import { converter } from "../utils/constants";
import Videos from "./Videos";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { useSelector } from "react-redux";
// import Popover from "@mui/material/Popover";
// import ChannelDetail from "./ChannelDetail";
import GroupIcon from "@mui/icons-material/Group";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

function VideoDetail() {
  const { id } = useParams();
  const idStore = id;
  // const [currVidDetails, setCurrVidDetails] = useState(null);
  // const { videos, setVideos } = useContext(CreateContext);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  // console.log("Searched for keyword - " + id);

  var vidDetails = useSelector((state) => {
    const items = state.videos.videos.items;

    if (!Array.isArray(items) || !idStore) {
      return null;
    }
    return items.find((item) => {
      // console.log(item.id + " " + idStore);
      return item.id == idStore;
    });
  });

  var channelDetails = useSelector((state) => {
    const items = state.channels.channels.items;

    if (!Array.isArray(items) || !vidDetails.snippet.channelId) {
      return null;
    }

    return items.find((item) => {
      // console.log(item.id + " " + vidDetails.snippet.channelId);
      return item.id == vidDetails.snippet.channelId;
    });
  });

  // var vidDetails = useSelector((state) => state.videos.videos.items);
  // console.log("details -" + JSON.stringify(vidDetails));
  console.log("details -" + JSON.stringify(channelDetails));

  // useEffect(() => {
  //   fetchApi1(
  //     `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
  //   ).then((res) => {
  //     setCurrVidDetails(res.items[0]);
  //   });
  //   // related videos
  //   fetchApi(`search?part=snippet&q=${id}`).then((res) => {
  //     setVideos(res.items);
  //     console.log(res.items);
  //   });
  // }, [id]);
  // console.log("Fetched Current details - " + JSON.stringify(currVidDetails));

  function extendDescription() {
    var val = document.getElementById("vidDescription").style.webkitLineClamp;
    if (val == 99)
      document.getElementById("vidDescription").style.webkitLineClamp = 2;
    else document.getElementById("vidDescription").style.webkitLineClamp = 99;
  }
  return (
    <Box
      className="vidDetail d-flex flex-wrap flex-column flex-md-row"
      sx={{ background: "inherit", position: "sticky" }}
    >
      <Stack className="col-md-9" direction={{ xs: "column", md: "row" }}>
        <Box flex={1} className="mb-5">
          <Box sx={{ width: "100%", position: "sticky", top: "80px" }}>
            <ReactPlayer
              className="react-player mb-3 mb-md-0"
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={false}
              muted
              controls
            />

            <Typography
              variant="h6"
              fontWeight="bold"
              className=" px-1 mt-3 px-md-3 mt-md-3 text-white"
            >
              {vidDetails?.snippet?.title}
            </Typography>
            <div
              color="grey"
              id="vidDescription"
              className="vidDescription text-white px-1 px-md-4 mt-0 mt-md-3"
              onClick={extendDescription}
              style={{ cursor: "pointer" }}
            >
              {vidDetails?.snippet?.localized?.description}
            </div>

            <Stack
              direction="row"
              className="d-flex align-items-center w-100 justify-content-between px-2 px-md-4 mt-2 mt-md-3"
            >
              <Link
                className="d-flex align-items-center gap-1 gap-md-2 mt-2 mt-md-0"
                to={`/channel/${vidDetails?.snippet?.channelId}`}
              >
                <Avatar
                  src={channelDetails?.snippet?.thumbnails?.default?.url}
                ></Avatar>
                <Typography sx={{ sm: "6", md: "6" }} color="#fff">
                  {vidDetails?.snippet?.channelTitle}
                </Typography>
              </Link>
              <Box className="d-flex gap-2">
                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                >
                  <IconButton className="text-white">
                    <WhatshotIcon />
                  </IconButton>
                  {converter(vidDetails?.statistics?.viewCount)}
                </Typography>
                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                  onClick={() => {
                    setLiked(!liked);
                    if (disliked == true) setDisliked(!disliked);
                  }}
                >
                  <IconButton className="text-white">
                    {liked ? <ThumbUp /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                  {converter(vidDetails?.statistics?.likeCount)}
                </Typography>

                <Typography
                  className="d-flex align-items-center"
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  color="#fff"
                  onClick={() => {
                    setDisliked(!disliked);
                    if (liked == true) setLiked(!liked);
                  }}
                >
                  <IconButton className="text-white">
                    {disliked ? <ThumbDown /> : <ThumbDownOutlinedIcon />}
                  </IconButton>
                </Typography>
                <Box className="subScribeBtnContainer">
                  <button className="subScribeBtn">
                    <Box className="text">Subscribe</Box>
                  </button>
                  <Link
                    className="d-flex align-items-center gap-1 gap-md-2 mt-2 mt-md-0"
                    to={`/channel/${vidDetails?.snippet?.channelId}`}
                  >
                    <Box className="subscribePopover">
                      <Box
                        className="channelBanner"
                        sx={{
                          objectFit: "cover",
                          objectPosition: "center center",
                          width: "100%",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={
                            channelDetails?.brandingSettings?.image
                              ?.bannerExternalUrl
                          }
                          style={{ width: "100%" }}
                          alt="channel banner"
                        />
                      </Box>
                      <Box className="channelDetailsBox">
                        <Avatar
                          src={
                            channelDetails?.snippet?.thumbnails?.default?.url
                          }
                          className="popoverAvatar"
                        ></Avatar>
                        <Typography className="title" color="#fff">
                          {vidDetails?.snippet?.channelTitle}
                          <Box className="customUrl">
                            {channelDetails?.snippet?.customUrl}
                          </Box>
                        </Typography>

                        <Typography className="subCount" variant="subtitle2">
                          <div
                            color="grey"
                            id="vidDescription"
                            className="vidDescription text-white px-1 px-md-4 mt-0 mt-md-3"
                            style={{ cursor: "pointer" }}
                          >
                            {vidDetails?.snippet?.localized?.description}
                          </div>
                          <br />
                          <Box className="vidDetails">
                            <Box className="d-flex align-items-center">
                              {converter(
                                channelDetails?.statistics?.subscriberCount
                              )}
                              &nbsp;
                              <IconButton className="text-white">
                                <GroupIcon />
                              </IconButton>
                            </Box>
                            <Box className="d-flex align-items-center">
                              {converter(channelDetails?.statistics?.viewCount)}
                              <IconButton className="text-white">
                                <WhatshotIcon />
                              </IconButton>
                            </Box>

                            <Box className="d-flex align-items-center">
                              {channelDetails?.statistics?.videoCount}
                              &nbsp;
                              <IconButton className="text-white">
                                <VideoCameraFrontIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Typography>
                      </Box>

                      {/* <ChannelDetail /> */}
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
      {/* <Stack className="col-md-3" direction="column">
        <Videos suggested="true" />
      </Stack> */}
    </Box>
  );
}

export default VideoDetail;
