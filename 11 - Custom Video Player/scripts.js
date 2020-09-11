/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build out functions */

function togglePlay (event) {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function skipTime (event) {
  const timeToSkip = Number(event.target.dataset.skip) || 0
  video.currentTime = video.currentTime + timeToSkip
}

function adjustPlay (event) {
  const name = event.target.name
  const value = Number(event.target.value) || 0
  if (name === 'volume') {
    video.volume = value
  } else if (name === 'playbackRate') {
    video.playbackRate = value
  }
}

function setProgress (event) {
  const progressAmount = event.offsetX / progress.offsetWidth
  video.currentTime = progressAmount * video.duration
}

function updateProgress (event) {
  progressAmount = 100 * (video.currentTime / video.duration)
  progressBar.style.flexBasis = progressAmount + '%'
}

function updateButton (event) {
  if (event.type === 'play') {
    toggle.textContent = '❚ ❚'
  } else if (event.type === 'pause') {
    toggle.textContent = '►'
  }
}

function setFullScreen (event) {
  if (video.requestFullscreen) {
    video.requestFullscreen()
  }
}


/* Hook up the event listeners */

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipTime))
ranges.forEach(range => range.addEventListener('input', adjustPlay))
progress.addEventListener('click', setProgress)
fullscreen.addEventListener('click', setFullScreen)

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)
