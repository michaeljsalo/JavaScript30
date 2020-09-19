const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)

      // Doesn't work anymore
      // video.src = window.URL.createObjectURL(localMediaStream)

      // This approach works
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(console.error)
}

function updateCanvas () {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  ctx.drawImage(video, 0, 0, width, height)
  let rawPixels = ctx.getImageData(0, 0, width, height)

  ctx.globalAlpha = 0.1
  // let filteredPixels = redEffect(rawPixels)
  let filteredPixels = rgbSplit(rawPixels)

  ctx.putImageData(filteredPixels, 0, 0)
}

function paintToCanvas () {
  setInterval(updateCanvas, 16)
}

function redEffect (pixels = {}) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Red
    pixels.data[i + 0] += 100

    // Green
    pixels.data[i + 1] -= 50

    // Blue
    pixels.data[i + 2] /= 2
  }
  return pixels
}

function rgbSplit (pixels = {}) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // Red
    pixels.data[i - 150] = pixels.data[i + 0]

    // Green
    pixels.data[i + 100] = pixels.data[i + 1]

    // Blue
    pixels.data[i - 150] = pixels.data[i + 2]
  }
  return pixels
}

function takePhoto () {
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  console.log(data)

  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src=${data} alt="Handsome Man" />`
  strip.insertBefore(link, strip.firstChild)
}

getVideo()

video.addEventListener('canplay', paintToCanvas)
