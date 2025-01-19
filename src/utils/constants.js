export const demoThumbnailUrl = "https://i.ibb.co/G2L2Gwp/API-Course.png";
export const demoChannelUrl = "/channel/UCmXmlB4-HJytD7wek0Uo97A";
export const demoVideoUrl = "/video/GDa8kZLNhJ4";
export const demoChannelTitle = "JavaScript Mastery";
export const demoVideoTitle =
  "Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI";
export const demoProfilePicture =
  "http://dergipark.org.tr/assets/app/images/buddy_sample.png";

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
