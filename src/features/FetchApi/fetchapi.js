import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_KEY = import.meta.env.VITE_API_KEY;
const results = 20;
export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/youtube/v3/",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (searchTerm) => ({
        url: `search`,
        method: "GET",
        params: {
          part: "snippet",
          q: searchTerm,
          key: API_KEY,
          maxResults: results,
          type: "video",
        },
      }),
    }),
    getVidDetails: builder.query({
      query: (vidIds) => ({
        url: `videos?part=snippet,contentDetails,statistics&id=${vidIds}&key=${API_KEY}`,
        method: "GET",
      }),
    }),
    getChannelDetails: builder.query({
      query: (channelIds) => ({
        url: `channels?part=snippet%2Cstatistics%2CbrandingSettings&id=${channelIds}&key=${API_KEY}`,
        method: "GET",
      }),
    }),
    getComments: builder.query({
      query: (videoId) => ({
        url: `commentThreads?part=snippet&videoId=${videoId}&order=relevance&key=${API_KEY}`,
        method: "GET",
      }),
    }),
    getChannelPlaylistId: builder.query({
      query: (channelId) => ({
        url: `channels?part=snippet%2Cstatistics%2CbrandingSettings%2CcontentDetails&id=${channelId}&key=${API_KEY}`,
        method: "GET",
      }),
    }),
    getChannelPlaylistItems: builder.query({
      query: (channelPlaylistId) => ({
        url: `playlistItems?part=snippet&playlistId=${channelPlaylistId}&key=${API_KEY}&maxResults=50`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVidDetailsQuery,
  useGetChannelDetailsQuery,
  useGetCommentsQuery,
  useGetChannelPlaylistIdQuery,
  useGetChannelPlaylistItemsQuery,
} = youtubeApi;
