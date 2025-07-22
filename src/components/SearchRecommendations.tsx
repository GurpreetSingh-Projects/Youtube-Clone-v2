import { Typewriter } from "react-simple-typewriter";
import { SearchRecommendationsProps } from "../utils/types";
import React from "react";
const SearchRecommendations: React.FC<SearchRecommendationsProps> = (props) => {
  return (
    <Typewriter
      words={props?.words}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={50}
      deleteSpeed={20}
      delaySpeed={1000}
    />
  );
};

export default SearchRecommendations;
