import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('play', function () {
  console.log('played the video!');
});

const TIME_KEY = 'videoplayer-current-time';

const timeStorage = JSON.parse(localStorage.getItem(TIME_KEY)) || {};

console.log(timeStorage);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  localStorage.setItem(TIME_KEY, JSON.stringify(evt));
  //   console.log(time);
}
player
  .setCurrentTime(timeStorage.seconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
