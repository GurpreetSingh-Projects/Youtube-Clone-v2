import axios from "axios";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const geminiApi = async (title, description, comments) => {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Summarize this youtube video in atleast 100 words and in a single para with no formatting - ${title} with description set as - ${description} and has user comments - ${JSON.stringify(
              comments
            )} `,
          },
        ],
      },
    ],
  };

  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
    params: { key: apiKey },
  });
  //   console.log(response);
  return response;
};
