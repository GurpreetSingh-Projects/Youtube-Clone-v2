import axios from "axios";
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  method: "GET",
  params: {
    maxResults: "2",
  },
  headers: {
    "X-RapidAPI-Key": "de0041e2c9msha710914b0ddffd0p195584jsncf1181588412",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
