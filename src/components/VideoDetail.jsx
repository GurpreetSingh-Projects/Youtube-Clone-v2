import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useParams, Link } from "react-router-dom";
import { converter, extendDescription } from "../utils/constants";
import Videos from "./Videos";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import Popover from "@mui/material/Popover";
// import ChannelDetail from "./ChannelDetail";
import GroupIcon from "@mui/icons-material/Group";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useGetCommentsQuery } from "../features/FetchApi/fetchapi";
import { setComments } from "../features/Comments/commentsSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import moment from "moment";
import SubscribeButton from "./SubscribeButton";
function VideoDetail() {
  const { id } = useParams();
  const idStore = id;
  const dispatch = useDispatch();
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

    if (!Array.isArray(items) || !vidDetails?.snippet?.channelId) {
      return null;
    }

    return items.find((item) => {
      // console.log(item.id + " " + vidDetails.snippet.channelId);
      return item.id == vidDetails.snippet.channelId;
    });
  });

  // var vidDetails = useSelector((state) => state.videos.videos.items);
  // console.log("details -" + JSON.stringify(vidDetails));
  // console.log("details -" + JSON.stringify(channelDetails));

  const { data } = useGetCommentsQuery(idStore, {
    keepUnusedDataFor: 24 * 3600,
  });

  useEffect(() => {
    if (data) {
      dispatch(setComments(data));
    }
  }, [data, dispatch]);

  const commentsList = useSelector((state) => state.comments.comments);
  // console.log("Comments list - " + JSON.stringify(commentsList.items));
  return (
    <Box
      className="vidDetail flex-column flex-md-row"
      sx={{ background: "inherit" }}
    >
      <Box
        className="col-md-9 leftSide"
        direction={{ xs: "column", md: "row" }}
      >
        <Box flex={1} className="mb-5">
          <Box sx={{ width: "100%", position: "sticky", top: "80px" }}>
            <ReactPlayer
              className="react-player mb-3 mb-md-0"
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={true}
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
              className="d-flex flex-wrap align-items-center w-100 justify-content-between px-2 px-md-4 mt-2 mt-md-3"
            >
              <Link
                className="d-flex align-items-center justify-content-center justify-content-md-start col-12 col-md-6 gap-1 gap-md-2 mt-2 mt-md-0"
                to={`/channel/${vidDetails?.snippet?.channelId}`}
              >
                <Avatar
                  src={channelDetails?.snippet?.thumbnails?.default?.url}
                ></Avatar>
                <Typography sx={{ sm: "6", md: "6" }} color="#fff">
                  {vidDetails?.snippet?.channelTitle}
                </Typography>
              </Link>
              <Box className="d-flex col-12 col-md-6 justify-content-center justify-content-md-end gap-2 mt-3 mt-md-0">
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
                  <SubscribeButton marginStart="ms-3" />
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
            <Box>
              <Box className="commentsContainer">
                <Typography color="#fff" className="commentsHeading">
                  What&apos;s buzzing about {vidDetails?.snippet?.channelTitle}
                  &apos;s video
                </Typography>

                <Typography color="#fff" className="commentsSubHeading">
                  Top Comments -
                </Typography>

                <Stack className="commentMain">
                  {commentsList.items && commentsList.items.length > 0
                    ? commentsList.items.map((item, idx) => (
                        <div key={idx}>
                          {/* {item.id} */}
                          <Box className="comments">
                            <div className="commentsWrapper">
                              <div className="commentAvatarContainer">
                                <Link
                                  to={`/channel/${item?.snippet?.topLevelComment?.snippet?.channelId}`}
                                >
                                  <Avatar
                                    className="commentAvatar"
                                    src={
                                      item?.snippet?.topLevelComment?.snippet
                                        ?.authorProfileImageUrl
                                    }
                                  ></Avatar>
                                </Link>
                              </div>
                              <div className="commentDetails">
                                <div className="">
                                  <div className="title">
                                    {
                                      item?.snippet?.topLevelComment?.snippet
                                        ?.authorDisplayName
                                    }
                                    <span className="mx-2"> &middot;</span>
                                    <span className="postedAt text-capitalize">
                                      {moment(
                                        item?.snippet?.topLevelComment?.snippet
                                          ?.updatedAt,
                                        "YYYYMMDD"
                                      ).fromNow()}
                                    </span>
                                  </div>
                                  <div className="commentText my-2 mb-3">
                                    {
                                      item?.snippet?.topLevelComment?.snippet
                                        ?.textOriginal
                                    }
                                  </div>
                                  <div className="commentActions text-center">
                                    <div className="reply">Reply</div>
                                    <div className="dropdown">
                                      <ArrowDropDownIcon />
                                      {item.snippet.totalReplyCount
                                        ? item.snippet.totalReplyCount
                                        : 0}
                                      &nbsp; Replies
                                    </div>
                                    <IconButton className="like pe-0">
                                      <ThumbUpOutlinedIcon fontSize="small" />{" "}
                                    </IconButton>
                                    {
                                      item?.snippet?.topLevelComment?.snippet
                                        ?.likeCount
                                    }
                                    <IconButton className="dislike">
                                      <ThumbDownOutlinedIcon fontSize="small" />
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Box>
                        </div>
                      ))
                    : "No Comments Found"}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="col-md-3 rightSide" direction="column">
        <Box sx={{ m: 2 }}>
          <Typography variant="subtitle" sx={{ color: "#fff" }}>
            Recommended Videos -
          </Typography>
        </Box>
        <Box>
          <Videos suggested="true" />
        </Box>
      </Box>
    </Box>
  );
}

export default VideoDetail;
