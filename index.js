// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
document.querySelector('video').onended = function () {
  if (this.played.end(0) - this.played.start(0) === this.duration) {
    console.log('Played all');
  } else {
    console.log('Some parts were skipped');
  }
};
const $video = document.querySelector('video');

var local_session_time = new Date().getTime();
var videoTour = {};
console.log(local_session_time);
const onTimeUpdate = (event) => {
  console.log(checkSkipped(event.target.currentTime));
};
const onRecordUpdate = (event) => {
  console.log(event);
};
let prevTime = 0;
const checkSkipped = (currentTime) => {
  const skip = [];
  // only record when user skip more than 2 seconds
  const skipThreshold = 2;

  // user skipped part of the video
  if (currentTime - prevTime > skipThreshold) {
    skip.push({
      periodSkipped: currentTime - prevTime,
      startAt: prevTime,
      endAt: currentTime,
    });
    prevTime = currentTime;
    return skip;
  }

  prevTime = currentTime;
  return false;
};

$video.addEventListener('play', onRecordUpdate); // console.log('play')
$video.addEventListener('playing', onRecordUpdate); //console.log('playing')
$video.addEventListener('timeupdate', onTimeUpdate);
$video.addEventListener('ended', onRecordUpdate); //console.log('ended')
$video.addEventListener('pause', onRecordUpdate); //console.log('pause')
