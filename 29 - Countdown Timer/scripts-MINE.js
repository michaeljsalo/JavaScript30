/*
 * #JavaScript30 lesson 29
 *
 * This was a good exercise in handling times and timers.
 * My clock is a little erratic but I'm mostly pleased with it.
 * Many gotchas were conquered in the making of this.
 *
 * Michael J Salo
 * 29 Sept 2020
 */


// Initialize state
let endTime    // Date object
let interval   // setInterval

// Select elements
const timerControls = document.querySelector('.timer__controls')
const form = document.querySelector('#custom')
const timeLeft = document.querySelector('.display__time-left')
const timeEnd = document.querySelector('.display__end-time')


// Define functions

function startCountdown (seconds) {
  clearInterval(interval)
  endTime = new Date(Date.now() + (1000 * seconds))

  // Run immediately, then twice a second for accuracy
  displayEndTime(seconds)
  displayCountdown()
  interval = setInterval(displayCountdown, 500)
}

// Helper function to display times as 00:00
function displayTimePart (number = 0) {
  return String(number).padStart(2, '0')
}

function displayCountdown () {

  // Calculate the countdown in seconds
  let countdown = Math.floor((endTime.getTime() - Date.now()) / 1000)
  console.log('countdown', countdown)

  // End the countdown at zero
  if (countdown < 0) {
    countdown = 0
    clearInterval(interval)
    return
  }

  // Turn seconds into minutes and seconds
  const countdownMinutes = displayTimePart(Math.floor(countdown / 60))
  const countdownSeconds = displayTimePart(countdown % 60)
  const countdownDisplay = countdownMinutes + ':' + countdownSeconds

  // Write to display
  timeLeft.textContent = countdownDisplay
  document.title = countdownDisplay
}

function displayEndTime (seconds = 0) {
  // Calculate back at time
  const backTimeStamp = Date.now() + (seconds * 1000)
  const backDate = new Date(backTimeStamp)
  const backHours = displayTimePart(backDate.getHours() % 12)
  const backMinutes = displayTimePart(backDate.getMinutes())
  const backTimeDisplay = `Be back at ${backHours}:${backMinutes}`

  timeEnd.textContent = backTimeDisplay
}


// Set event handlers
function handleButtonClick (event) {
  if (event.target.classList.contains('timer__button')) {
    const seconds = Number(event.target.dataset.time) || 0
    startCountdown(seconds)
  }
}

function handleFormChange (event) {
  const minutes = Number(event.target.value) || 0
  startCountdown(minutes * 60)
}

function handleFormSubmit (event) {
  event.preventDefault()
}


// Set event listeners
timerControls.addEventListener('click', handleButtonClick)
form.addEventListener('change', handleFormChange)
form.addEventListener('submit', handleFormSubmit)
