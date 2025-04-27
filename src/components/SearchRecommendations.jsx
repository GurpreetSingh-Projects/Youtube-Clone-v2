import React from "react";
import { Typewriter } from "react-simple-typewriter";

const SearchRecommendations = (props) => {
  return (
    <Typewriter
      words={props?.words}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={20}
      delaySpeed={1000}
    />
  );
};

export default SearchRecommendations;
