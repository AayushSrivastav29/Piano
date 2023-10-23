const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audio = new Audio(`tunes2/a.wav`);
let isRecording = false;
const recordedTunes = [];

const playTune = (key) => {
  audio.src = `tunes2/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);

  if (isRecording) {
    recordedTunes.push(key);
  }
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
  if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// Event listener for the record button
document.getElementById("record-button").addEventListener("click", () => {
  isRecording = true;
  recordedTunes.length = 0; // Clear any previous recordings
  displayMessage("Recording started...");
});

// Event listener for the stop recording button
document.getElementById("stop-record-button").addEventListener("click", () => {
  isRecording = false;
  displayMessage("Recording stopped.");
});

// Event listener for the playback button
document.getElementById("playback-button").addEventListener("click", () => {
  if (recordedTunes.length > 0) {
    playRecordedTunes(recordedTunes, () => {
      // Playback completed; trigger confetti animation
      triggerConfetti();
    });
  }
});

function playRecordedTunes(tunes2) {
  let index = 0;
  const playbackInterval = setInterval(() => {
    if (index < tunes2.length) {
      playTune(tunes2[index]);
      index++;
    } else {
      clearInterval(playbackInterval);
    }
  }, 600);
}

// Function to display messages
function displayMessage(message) {
  const messageBox = document.querySelector(".message-box");
  messageBox.textContent = message;
  messageBox.style.display = "block";

  // Automatically hide the message after a few seconds
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000); // Adjust the time as needed (3000ms = 3 seconds)
}

// Function to trigger the confetti animation
function triggerConfetti() {
  startConfetti(); 
  setTimeout(stopConfetti, 5000); // Stop confetti after 5 seconds 
}
