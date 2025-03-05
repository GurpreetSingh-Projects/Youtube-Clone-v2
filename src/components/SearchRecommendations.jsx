import React from "react";
import { Typewriter } from "react-simple-typewriter";

const SearchRecommendations = () => {
  return (
    <Typewriter
      words={[
        "How to code a responsive website",
        "Top web development trends",
        "CSS animations tutorial for beginners",
        "JavaScript vs TypeScript: Which is better?",
        "Best practices for SEO in web design",
        "How to optimize website performance",
        "What's!",
        "Welcome to React!",
        "Enjoy coding!",
      ]}
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
