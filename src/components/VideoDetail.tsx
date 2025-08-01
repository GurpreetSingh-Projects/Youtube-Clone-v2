import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";
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
import {
  useGetCommentsQuery,
  useGetVideosQuery,
} from "../features/FetchApi/fetchapi";
import { setComments } from "../features/Comments/commentsSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import moment from "moment";
import SubscribeButton from "./SubscribeButton";
import { setChannelId } from "../features/CurrChannel/currChannelSlice";
import { setCurrVidId, setVidIds } from "../features/VidIds/vidIdsSlice";
import TimedOut from "./TimedOut";
import { setRecommended, setVideos } from "../features/Videos/videoSlice";
import axios from "axios";
import SearchRecommendations from "./SearchRecommendations";
import { Typewriter } from "react-simple-typewriter";
import useGetUrl from "../features/GetUrl/getUrl";
import { setCategory } from "../features/Category/categorySlice";
import { geminiApi } from "../features/FetchApi/geminiApi";
import { setChannelIds } from "../features/ChannelIds/channelidsSlice";

const VideoDetail = () => {
  var id = useSelector((state) => state.vidIds.currVidId);
  const getUrl = useGetUrl();
  if (!id) {
    var id = getUrl();
    // console.log(id);
  }
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [words, setWords] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  var vidDetails = useSelector((state) => {
    const items = state.videos.videos.items;

    if (!Array.isArray(items) || !id) {
      return "";
    } else {
      return items.find((item) => {
        return item.id == id;
      });
    }
  });

  var existingVidIds = useSelector((state) => {
    return state?.vidIds?.vidIds;
  });
  // console.log(existingVidIds);

  // console.log(id + ", " + existingVidIds);
  useEffect(() => {
    if (!vidDetails && !existingVidIds) {
      dispatch(setVidIds(id + ", " + existingVidIds));
    }
  }, []);

  var channelDetails = useSelector((state) => {
    const items = state.channels.channels.items;

    if (!Array.isArray(items) || !vidDetails?.snippet?.channelId) {
      return "";
    }

    return items.find((item) => {
      return item.id == vidDetails.snippet.channelId;
    });
  });
  useEffect(() => {
    if (vidDetails?.snippet?.channelId != "") {
      dispatch(setChannelId(vidDetails?.snippet?.channelId));
    } else {
      dispatch(setChannelId(""));
    }
  }, [vidDetails]);

  var existingChannelIds = useSelector((state) => {
    return state?.channelIds?.channelIds;
  });
  // console.log(existingChannelIds);

  // console.log(id + ", " + existingChannelIds);
  useEffect(() => {
    if (!vidDetails) {
      dispatch(setChannelIds(id + ", " + existingChannelIds));
    }
  }, []);

  // var vidDetails = useSelector((state) => state.videos.videos.items);
  // console.log("details -" + JSON.stringify(vidDetails));
  // console.log("details -" + JSON.stringify(channelDetails));

  const { data } = useGetCommentsQuery(id, {
    keepUnusedDataFor: 24 * 3600,
  });

  useEffect(() => {
    if (data) {
      dispatch(setComments(data));
    }
  }, [data, dispatch]);

  const commentsList = useSelector((state) => state.comments.comments);

  const { data: getVideos } = useGetVideosQuery(id, {
    skip: !id,
    keepUnusedDataFor: 24 * 3600,
  });
  // let homeVids = useSelector((state) => state?.videos?.videos);
  // console.log("homevides: " + homeVids);
  // let mergedVideos = [...homeVids, ...getVideos];
  // console.log(mergedVideos);
  useEffect(() => {
    if (getVideos) {
      dispatch(setRecommended(getVideos));
      // dispatch(setVideos(...getVideos));
    }
  }, [getVideos]);
  // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  useEffect(() => {
    setShowSummary(false);
    const gemini = async () => {
      // const url =
      //   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      // const payload = {
      //   contents: [
      //     {
      //       parts: [
      //         {
      //           text: `Summarize this youtube video in atleast 100 words and in a single para with no formatting - ${
      //             vidDetails?.snippet?.title
      //           } with description set as - ${
      //             vidDetails?.snippet?.localized?.description
      //           } and has user comments - ${JSON.stringify(commentsList)} `,
      //         },
      //       ],
      //     },
      //   ],
      // };
      // const response = await axios.post(url, payload, {
      //   headers: { "Content-Type": "application/json" },
      //   params: { key: apiKey },
      // });
      let response = await geminiApi(
        vidDetails?.snippet?.title,
        vidDetails?.snippet?.localized?.description,
        commentsList
      );
      if (response?.data?.candidates[0]?.content?.parts[0]?.text.length > 2) {
        setWords([`${response?.data?.candidates[0]?.content?.parts[0]?.text}`]);
        setShowSummary(true);
      } else {
        setWords([`${response?.data?.candidates[0]?.content?.parts[0]?.text}`]);
      }
    };
    gemini();
  }, [vidDetails?.snippet?.title]);
  // let words = [`${summary?.data?.candidates[0]?.content?.parts[0]?.text}`];
  // console.log("Comments list - " + JSON.stringify(commentsList.items));

  return (
    <Box
      className="vidDetail flex-column flex-md-row"
      sx={{ background: "inherit" }}
    >
      <Box
        className="col-lg-9 leftSide"
        direction={{ xs: "column", md: "row" }}
      >
        <Box flex={1} className="mb-5">
          <Box sx={{ width: "100%", position: "sticky", top: "80px" }}>
            <ReactPlayer
              id="react-player"
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

            <Box className="commentsContainer mb-0">
              <Typography
                color="#fff"
                className="commentsHeading"
                sx={{ fontWeight: 700, fontSize: "18px" }}
              >
                A.I. Generated Quick Video Summary (Gemini 2.0 Flash ) -
              </Typography>
              {showSummary ? (
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 300,
                    fontSize: "14px",
                    textAlign: "justify",
                  }}
                >
                  <Typewriter
                    words={words}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={5}
                    deleteSpeed={0}
                    delaySpeed={99999999}
                  />
                </Typography>
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    className="mt-2 bg-white rounded"
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    className="mt-2 bg-white rounded"
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    className="mt-2 bg-white rounded"
                    height={20}
                  />
                  <Skeleton
                    variant="rectangular"
                    className="mt-2 bg-white rounded"
                    height={20}
                  />
                </>
              )}
            </Box>

            <div
              color="grey"
              id="vidDescription"
              className="vidDescription text-white px-1 px-md-4 mt-0"
              onClick={extendDescription}
              style={{ cursor: "pointer" }}
            >
              <Typography
                color="#fff"
                className="commentsHeading"
                sx={{ fontWeight: 700, fontSize: "18px", mB: "20px" }}
              >
                Video Description -
              </Typography>
              {vidDetails?.snippet?.localized?.description}
            </div>

            <Stack
              direction="row"
              className="d-flex flex-wrap align-items-center w-100 justify-content-between px-2 px-md-4 mt-5 mt-md-3"
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
                        </Typography>
                        <Box className="customUrl">
                          {channelDetails?.snippet?.customUrl}hehe
                        </Box>

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
                  {commentsList.items && commentsList.items.length > 0 ? (
                    commentsList.items.map((item, idx) => (
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
                  ) : (
                    <TimedOut comments={true} />
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="col-lg-3 rightSide" direction="column">
        <Box sx={{ m: 2 }}>
          <Typography variant="subtitle" sx={{ color: "#fff" }}>
            Recommended Videos -
          </Typography>
        </Box>
        <Box>
          <Videos recommended="true" />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
