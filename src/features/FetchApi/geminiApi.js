import axios from "axios";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const model = import.meta.env.VITE_GEMINI_MODEL;
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export const geminiApi = async (title, description, comments) => {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Summarize this video in atleast 100 words and single para with no formatting - ${title} with description set as - ${description} and has comments - ${JSON.stringify(
              comments,
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
