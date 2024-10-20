import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

const options = {
  method: "GET",
  params: {
    maxResults: "20",
  },
};

export const fetchApi = async (url) => {
  const { data } = await axios.get(
    `${BASE_URL}/${url}&key=${import.meta.env.VITE_API_KEY}`,
    options
  );
  return data;
};
