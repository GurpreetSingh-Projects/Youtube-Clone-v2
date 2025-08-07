export const demoThumbnailUrl = "https://i.ibb.co/G2L2Gwp/API-Course.png";
export const demoChannelUrl = "/channel/UCmXmlB4-HJytD7wek0Uo97A";
export const demoVideoUrl = "/video/GDa8kZLNhJ4";
export const demoChannelTitle = "JavaScript Mastery";
export const demoVideoTitle =
  "Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI";
export const demoProfilePicture =
  "http://dergipark.org.tr/assets/app/images/buddy_sample.png";

export const words: string[] = [
  "How to code a responsive website",
  "Top web development trends",
  "CSS animations tutorial for beginners",
  "JavaScript vs TypeScript: Which is better?",
  "Best practices for SEO in web design",
  "How to optimize website performance",
  "What's Trending!",
  "Welcome to React!",
  "Enjoy coding!",
];
export const searchRecommendation: string[] = [
  "AI music composition",
  "virtual concerts",
  "Spotify music algorithm",
  "React 19 RC",
  "MIDI controller review",
  "Tidal vs Spotify sound quality",
  "Art",
  "Top Cooking",
  "gaming music soundtrack",
  "Next js",
  "digital piano vs acoustic",
  "music production software",
  "News",
  "Photos App",
  "Portfolio",
];
export function converter(val) {
  // console.log(val);
  val = parseInt(val);
  if (val >= 1000 && val < 1000000) {
    val /= 1000;
    return parseInt(val) + "k";
  } else if (val > 1000000 && val < 1000000000) {
    val /= 1000000;
    return parseInt(val) + "M";
  } else if (val > 1000000000) {
    val /= 1000000000;
    return parseInt(val) + "B";
  }
}

export function extendDescription() {
  var val = document.getElementById("vidDescription").style.webkitLineClamp;
  if (val == 99)
    document.getElementById("vidDescription").style.webkitLineClamp = 2;
  else document.getElementById("vidDescription").style.webkitLineClamp = 99;
}

export function handleScroll() {
  const player = document.getElementById("react-player");
  if (player) {
    player.scrollIntoView();
  }
}
